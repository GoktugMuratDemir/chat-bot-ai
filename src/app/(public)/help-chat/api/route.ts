import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

interface Doc {
  id: number;
  title: string;
  url: string;
  category: string;
  content: string;
}

// ─── Knowledge base (RAG context) ────────────────────────────────────────────
const DOCS: Doc[] = [
  {
    id: 1,
    title: "Fatura Oluşturma",
    url: "/faturalar/yeni",
    category: "Fatura",
    content:
      "Yeni fatura oluşturmak için sol menüden Faturalar sekmesine gidin. Sağ üst köşedeki + Yeni Fatura butonuna tıklayın. Müşteri adını arama kutusundan seçin, ürün veya hizmetleri ekleyin, ardından Kaydet butonuna basın.",
  },
  {
    id: 2,
    title: "Fatura Kaydedilmiyor Sorunu",
    url: "/faturalar/yeni",
    category: "Sorun Giderme",
    content:
      "Fatura kaydedilemiyorsa şunları kontrol edin: Müşteri seçilmiş mi? En az bir kalem eklenmiş mi? Tutar alanları dolu mu? Hata devam ederse sayfayı yenileyip tekrar deneyin.",
  },
  {
    id: 3,
    title: "Kullanıcı Ekleme",
    url: "/ayarlar/kullanicilar",
    category: "Ayarlar",
    content:
      "Sisteme yeni kullanıcı eklemek için Ayarlar > Kullanıcılar menüsüne gidin. + Kullanıcı Ekle butonuna tıklayın. Ad, e-posta ve rol bilgilerini girin. Kaydet'e bastığınızda kullanıcıya aktivasyon e-postası gönderilir.",
  },
  {
    id: 4,
    title: "Şifremi Unuttum",
    url: "/giris",
    category: "Giriş",
    content:
      "Giriş sayfasında Şifremi Unuttum linkine tıklayın. E-posta adresinizi girin. Gelen kutunuza sıfırlama linki gelecektir. Link 24 saat geçerlidir.",
  },
  {
    id: 5,
    title: "Rapor İndirme",
    url: "/raporlar",
    category: "Raporlar",
    content:
      "Raporlar menüsünden istediğiniz rapor türünü seçin. Tarih aralığını belirleyin. PDF veya Excel formatında indirmek için İndir butonuna tıklayın.",
  },
];

// ─── Keyword-based RAG retrieval ──────────────────────────────────────────────
function retrieveDocs(query: string): Doc[] {
  const q = query.toLowerCase();
  return DOCS.filter(
    (doc) =>
      doc.content.toLowerCase().includes(q) ||
      doc.title.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q),
  ).slice(0, 3);
}

function buildSystemPrompt(docs: Doc[]): string {
  const context = docs
    .map((d) => `## ${d.title} (Sayfa: ${d.url})\n${d.content}`)
    .join("\n\n");

  return `Sen bir yazılımın yardım asistanısın. Kullanıcılara yazılımı nasıl kullanacaklarını ve sorunlarını nasıl çözeceklerini TÜRKÇE olarak açıklıyorsun.

Yanıt kuralların:
- Kısa ve net ol (3-5 cümle max)
- Adım adım yönlendirme yap (1. 2. 3. formatında)
- Eğer bir sayfa linki varsa mutlaka belirt: "→ Sayfa adı (/url/yolu)"
- Bilmediğin konularda "Bu konu hakkında yardım için destek ekibimizle iletişime geçin." de
- Markdown kullanma, düz metin yaz

Mevcut dokümantasyon:
${context || "Bu konuya özel dokümantasyon bulunamadı. Genel bilgine göre yardımcı ol."}`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
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

  // Build Ollama messages: system + prior conversation turns + current user message
  // history from client already includes current user as last item, so exclude it
  const priorTurns = history.filter((_, i) => i < history.length - 1);

  const ollamaMessages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...priorTurns,
    { role: "user", content: message.trim() },
  ];

  const encoder = new TextEncoder();

  // TransformStream: Response is returned immediately with the readable end.
  // The async writer runs fire-and-forget so each write() is flushed right away
  // instead of waiting for the whole async function to settle (the ReadableStream
  // async start() bug where chunks are held until the Promise resolves).
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const write = (obj: unknown) =>
    writer.write(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

  // Fire and forget – do NOT await this
  (async () => {
    await write({ type: "sources", sources: relevantDocs });

    let ollamaRes: Response;
    try {
      ollamaRes = await fetch("https://speaking.chat.eltaexams.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5:7b-instruct",
          stream: true,
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
