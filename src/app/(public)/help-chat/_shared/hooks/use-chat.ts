"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { KeyboardEvent } from "react";
import type { Message, Source } from "../types";
import { CHAT_CONFIG } from "../config";
import { retrieveDocs, buildSystemPrompt } from "../utils";

// ─── Chat Hook ────────────────────────────────────────────────────────────────

export function useChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Merhaba! Size nasıl yardımcı olabilirim? 👋",
      sources: [],
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Direct DOM ref for streaming — bypasses React batching entirely
  const streamNodeRef = useRef<HTMLDivElement>(null);
  const streamTextRef = useRef<string>("");
  // Character-by-character typewriter queue
  const charQueueRef = useRef<string[]>([]);
  const drainingRef = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  function drainQueue() {
    if (drainingRef.current || charQueueRef.current.length === 0) return;
    drainingRef.current = true;
    function step() {
      const char = charQueueRef.current.shift();
      if (char !== undefined) {
        streamTextRef.current += char;
        if (streamNodeRef.current) {
          streamNodeRef.current.textContent = streamTextRef.current;
          bottomRef.current?.scrollIntoView({
            behavior: "instant",
          } as ScrollIntoViewOptions);
        }
        setTimeout(step, CHAT_CONFIG.typewriterDelayMs);
      } else {
        drainingRef.current = false;
      }
    }
    step();
  }

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { role: "user", text: trimmed };
      const nextMessages = [...messages, userMsg];
      const assistantIdx = nextMessages.length;

      streamTextRef.current = "";
      charQueueRef.current = [];
      drainingRef.current = false;

      setMessages([
        ...nextMessages,
        { role: "assistant", text: "", sources: [], isStreaming: true },
      ]);
      setInput("");
      setLoading(true);

      let collectedSources: Source[] = [];
      let errorOccurred = false;

      try {
        const relevantDocs = retrieveDocs(trimmed);
        collectedSources = relevantDocs;
        const systemPrompt = buildSystemPrompt(relevantDocs);

        const historyMsgs = nextMessages
          .slice(-CHAT_CONFIG.maxHistoryMessages)
          .map((m) => ({ role: m.role, content: m.text }));
        const priorTurns = historyMsgs.slice(0, -1);

        const res = await fetch(CHAT_CONFIG.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: CHAT_CONFIG.model,
            stream: CHAT_CONFIG.stream,
            messages: [
              { role: "system", content: systemPrompt },
              ...priorTurns,
              { role: "user", content: trimmed },
            ],
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

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
              if (token) {
                for (const char of token) {
                  charQueueRef.current.push(char);
                }
                drainQueue();
              }
            } catch {
              // skip malformed NDJSON lines
            }
          }
        }
      } catch {
        errorOccurred = true;
      } finally {
        // Wait for the typewriter drainer to finish before committing to React state
        await new Promise<void>((resolve) => {
          const poll = () => {
            if (charQueueRef.current.length === 0 && !drainingRef.current)
              resolve();
            else setTimeout(poll, CHAT_CONFIG.pollingIntervalMs);
          };
          poll();
        });

        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIdx] = {
            role: "assistant",
            text: errorOccurred
              ? "Bağlantı hatası oluştu. Lütfen tekrar deneyin."
              : streamTextRef.current,
            sources: collectedSources,
            isStreaming: false,
          };
          return updated;
        });
        setLoading(false);
      }
    },
    [messages, loading],
  );

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return {
    open,
    setOpen,
    input,
    setInput,
    loading,
    messages,
    bottomRef,
    inputRef,
    streamNodeRef,
    sendMessage,
    handleKeyDown,
  };
}
