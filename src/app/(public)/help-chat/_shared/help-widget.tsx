"use client";

import { useChat } from "./hooks";
import { CHAT_CONFIG } from "./config";
import { DEFAULT_SUGGESTIONS } from "./utils";
import { ChatFab } from "./sections";
import { ChatHeader } from "./sections";
import { ChatMessages } from "./sections";
import { ChatSuggestions } from "./sections";
import { ChatInput } from "./sections";
import type { HelpWidgetProps } from "./types";

// ─── Help Widget ──────────────────────────────────────────────────────────────
// Tüm ayarlar için _shared/config/index.ts dosyasını kullanın.

export function HelpWidget({
  title = CHAT_CONFIG.defaultTitle,
  placeholder = CHAT_CONFIG.defaultPlaceholder,
  suggestions = DEFAULT_SUGGESTIONS,
  accentColor = CHAT_CONFIG.defaultAccentColor,
}: HelpWidgetProps) {
  const {
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
  } = useChat();

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

      {!open && (
        <ChatFab
          accentColor={accentColor}
          fabBottom={CHAT_CONFIG.fabBottom}
          fabRight={CHAT_CONFIG.fabRight}
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div
          className="hw-fade-in"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: CHAT_CONFIG.widgetWidth,
            height: CHAT_CONFIG.widgetHeight,
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
          <ChatHeader
            title={title}
            accentColor={accentColor}
            onClose={() => setOpen(false)}
          />

          <ChatMessages
            messages={messages}
            loading={loading}
            accentColor={accentColor}
            streamNodeRef={streamNodeRef}
            bottomRef={bottomRef}
          />

          {showSuggestions && (
            <ChatSuggestions
              suggestions={suggestions}
              accentColor={accentColor}
              onSend={sendMessage}
            />
          )}

          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => sendMessage(input)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            accentColor={accentColor}
            loading={loading}
            inputRef={inputRef}
          />
        </div>
      )}
    </>
  );
}
