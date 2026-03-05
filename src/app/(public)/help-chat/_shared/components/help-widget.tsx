"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Source {
  id: number;
  title: string;
  url: string;
  category: string;
}

interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
}

interface HelpWidgetProps {
  title?: string;
  placeholder?: string;
  suggestions?: string[];
  accentColor?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Fatura: "#3b82f6",
  "Sorun Giderme": "#f59e0b",
  Ayarlar: "#8b5cf6",
  Giriş: "#10b981",
  Raporlar: "#ef4444",
  Genel: "#64748b",
};

const DEFAULT_SUGGESTIONS = [
  "Nasıl fatura oluştururum?",
  "Şifremi unuttum",
  "Yeni kullanıcı nasıl eklerim?",
  "Rapor nasıl indiririm?",
];

// ─── Component ─────────────────────────────────────────────────────────────
export function HelpWidget({
  title = "Yardım Asistanı",
  placeholder = "Sorunuzu yazın…",
  suggestions = DEFAULT_SUGGESTIONS,
  accentColor = "#6366f1",
}: HelpWidgetProps) {
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/help-chat/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: { answer: string; sources: Source[] } = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
          sources: data.sources ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Bağlantı hatası oluştu. Lütfen tekrar deneyin.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showSuggestions = messages.length === 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .hw-fade-in { animation: hwFadeIn .3s cubic-bezier(.16,1,.3,1) both; }
        .hw-msg-in  { animation: hwMsgIn  .22s ease both; }
        @keyframes hwFadeIn { from { opacity:0; transform:translateY(18px) scale(.97) } to { opacity:1; transform:none } }
        @keyframes hwMsgIn  { from { opacity:0; transform:translateY(6px)  } to { opacity:1; transform:none } }
        @keyframes hwPulse  { 0%,100% { box-shadow:0 0 0 0 ${accentColor}66 } 50% { box-shadow:0 0 0 10px ${accentColor}00 } }
        @keyframes hwBlink  { 0%,100% { opacity:1 } 50% { opacity:.3 } }
        .hw-fab     { animation: hwPulse 2.5s ease infinite; }
        .hw-dot     { animation: hwBlink 1s ease infinite; }
        .hw-dot:nth-child(2) { animation-delay:.2s }
        .hw-dot:nth-child(3) { animation-delay:.4s }
        .hw-scroll  { scrollbar-width:thin; scrollbar-color:#2d3748 transparent; }
        .hw-scroll::-webkit-scrollbar { width:4px }
        .hw-scroll::-webkit-scrollbar-thumb { background:#2d3748; border-radius:4px }
        .hw-btn-sug:hover { border-color:${accentColor} !important; color:${accentColor} !important; background:${accentColor}15 !important; }
        .hw-send:hover:not(:disabled) { opacity:.9; transform:scale(1.05); }
        .hw-close:hover { background:rgba(255,255,255,.12) !important; color:#e2e8f0 !important; }
        .hw-source:hover { background:rgba(255,255,255,.08) !important; }
      `}</style>

      {/* ── FAB Button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="hw-fab"
          aria-label="Yardım Asistanını Aç"
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9999,
            width: 58,
            height: 58,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: `linear-gradient(135deg, ${accentColor}, #8b5cf6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 32px ${accentColor}55`,
          }}
        >
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M12 3C6.5 3 2 6.58 2 11a7.77 7.77 0 0 0 2.75 5.74L2 22l5.5-2.5C8.9 20.14 10.41 20.5 12 20.5c5.5 0 10-3.58 10-8S17.5 3 12 3z" />
          </svg>
          <span
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 15,
              height: 15,
              borderRadius: "50%",
              background: "#10b981",
              border: "2.5px solid #0f1117",
            }}
          />
        </button>
      )}

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="hw-fade-in"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 390,
            height: 620,
            background: "#131720",
            border: "1px solid #1e2535",
            borderRadius: 20,
            boxShadow: `0 32px 80px rgba(0,0,0,.65), 0 0 0 1px ${accentColor}22`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "linear-gradient(135deg,#1a1f2e,#1e2540)",
              borderBottom: "1px solid #1e2535",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                flexShrink: 0,
                background: `linear-gradient(135deg,${accentColor},#8b5cf6)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 3C6.5 3 2 6.58 2 11a7.77 7.77 0 0 0 2.75 5.74L2 22l5.5-2.5C8.9 20.14 10.41 20.5 12 20.5c5.5 0 10-3.58 10-8S17.5 3 12 3z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "#e2e8f0",
                  letterSpacing: "-.3px",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 6px #10b981",
                  }}
                />
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  AI destekli · Çevrimiçi
                </span>
              </div>
            </div>
            <button
              className="hw-close"
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,.06)",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                width: 30,
                height: 30,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                transition: "all .2s",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className="hw-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className="hw-msg-in"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    maxWidth: "86%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      msg.role === "user"
                        ? `linear-gradient(135deg,${accentColor},#8b5cf6)`
                        : "#1e2535",
                    color: msg.role === "user" ? "white" : "#cbd5e1",
                    fontSize: 13.5,
                    lineHeight: 1.65,
                    boxShadow:
                      msg.role === "user"
                        ? `0 4px 16px ${accentColor}44`
                        : "0 2px 8px rgba(0,0,0,.3)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </div>

                {msg.sources && msg.sources.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 5,
                      maxWidth: "86%",
                    }}
                  >
                    {msg.sources.map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        className="hw-source"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "3px 9px",
                          borderRadius: 20,
                          textDecoration: "none",
                          background: "rgba(255,255,255,.04)",
                          border: `1px solid ${CATEGORY_COLORS[s.category] ?? "#4a5568"}40`,
                          fontSize: 11,
                          color: CATEGORY_COLORS[s.category] ?? "#94a3b8",
                          transition: "background .2s",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background:
                              CATEGORY_COLORS[s.category] ?? "#94a3b8",
                          }}
                        />
                        {s.title}
                        <span style={{ opacity: 0.5, fontSize: 10 }}>↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div
                className="hw-msg-in"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#1e2535",
                    borderRadius: "16px 16px 16px 4px",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="hw-dot"
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: accentColor,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: "#475569" }}>
                  Yanıt hazırlanıyor…
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {showSuggestions && (
            <div
              style={{
                padding: "0 16px 10px",
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="hw-btn-sug"
                  onClick={() => sendMessage(s)}
                  style={{
                    padding: "5px 11px",
                    borderRadius: 20,
                    border: "1px solid #2d3748",
                    background: "transparent",
                    color: "#94a3b8",
                    fontSize: 11.5,
                    cursor: "pointer",
                    transition: "all .2s",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "10px 14px",
              borderTop: "1px solid #1e2535",
              background: "#0f1117",
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              style={{
                flex: 1,
                background: "#1a1f2e",
                border: "1px solid #2d3748",
                borderRadius: 12,
                padding: "10px 13px",
                color: "#e2e8f0",
                fontSize: 13.5,
                resize: "none",
                outline: "none",
                fontFamily: "'DM Sans',sans-serif",
                lineHeight: 1.5,
                maxHeight: 100,
                overflowY: "auto",
                transition: "border-color .2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = accentColor)}
              onBlur={(e) => (e.target.style.borderColor = "#2d3748")}
            />
            <button
              className="hw-send"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                background:
                  loading || !input.trim()
                    ? "#1e2535"
                    : `linear-gradient(135deg,${accentColor},#8b5cf6)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .2s",
                boxShadow:
                  loading || !input.trim()
                    ? "none"
                    : `0 4px 16px ${accentColor}44`,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={loading || !input.trim() ? "#4a5568" : "white"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
