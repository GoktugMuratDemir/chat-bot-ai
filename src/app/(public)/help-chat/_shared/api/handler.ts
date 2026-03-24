import { NextRequest, NextResponse } from "next/server";
import { CHAT_CONFIG } from "../config";
import { retrieveDocs } from "../utils";
import { buildSystemPrompt } from "../utils";
import type { ChatMessage, RequestBody } from "../types";

// ─── Ollama SSE Handler ────────────────────────────────────────────────────────
// Bu fonksiyon api/route.ts tarafından çağrılır.
// Ollama yapılandırmasını değiştirmek için _shared/config/index.ts dosyasını kullanın.

export async function handleChatRequest(req: NextRequest): Promise<Response> {
  let body: RequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { message, history = [] } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const relevantDocs = retrieveDocs(message);
  const systemPrompt = buildSystemPrompt(relevantDocs);

  const priorTurns = history.filter((_, i) => i < history.length - 1);

  const ollamaMessages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...priorTurns,
    { role: "user", content: message.trim() },
  ];

  const encoder = new TextEncoder();

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const write = (obj: unknown) =>
    writer.write(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

  // Fire-and-forget: returns the readable stream immediately, writes async
  (async () => {
    await write({ type: "sources", sources: relevantDocs });

    let ollamaRes: Response;
    try {
      ollamaRes = await fetch(CHAT_CONFIG.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: CHAT_CONFIG.model,
          stream: CHAT_CONFIG.stream,
          messages: ollamaMessages,
        }),
      });
    } catch (err) {
      console.error("[help-chat] Fetch error:", err);
      await write({ type: "error" });
      await writer.close();
      return;
    }

    if (!ollamaRes.ok || !ollamaRes.body) {
      const errText = await ollamaRes.text().catch(() => "unknown");
      console.error("[help-chat] Ollama error:", errText);
      await write({ type: "error" });
      await writer.close();
      return;
    }

    const reader = ollamaRes.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            const token: string = json?.message?.content ?? "";
            if (token) await write({ type: "token", token });
          } catch {
            // skip malformed NDJSON lines
          }
        }
      }
    } finally {
      await write({ type: "done" });
      await writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
