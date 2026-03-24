"use client";

import type { RefObject } from "react";
import type { Message } from "../types";
import { CATEGORY_COLORS } from "../utils/constants";

// ─── Chat Messages List ───────────────────────────────────────────────────────

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  accentColor: string;
  streamNodeRef: RefObject<HTMLDivElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export function ChatMessages({
  messages,
  loading,
  accentColor,
  streamNodeRef,
  bottomRef,
}: ChatMessagesProps) {
  return (
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
            {msg.isStreaming ? (
              // Streaming: a bare div whose textContent is written directly
              // to the DOM on every token — no React re-render needed
              <div
                ref={streamNodeRef}
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              />
            ) : (
              msg.text
            )}
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
                      background: CATEGORY_COLORS[s.category] ?? "#94a3b8",
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

      {/* Typing indicator – shown only while waiting for the first token */}
      {loading && messages[messages.length - 1]?.text === "" && (
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
  );
}
