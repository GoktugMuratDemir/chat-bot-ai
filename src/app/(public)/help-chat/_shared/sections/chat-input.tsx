"use client";

import type { KeyboardEvent, RefObject } from "react";

// ─── Chat Input Area ──────────────────────────────────────────────────────────

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  accentColor: string;
  loading: boolean;
  inputRef: RefObject<HTMLTextAreaElement | null>;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  placeholder,
  accentColor,
  loading,
  inputRef,
}: ChatInputProps) {
  const disabled = loading || !value.trim();

  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
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
        onClick={onSubmit}
        disabled={disabled}
        aria-label="Gönder"
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          background: disabled
            ? "#1e2535"
            : `linear-gradient(135deg,${accentColor},#8b5cf6)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all .2s",
          boxShadow: disabled ? "none" : `0 4px 16px ${accentColor}44`,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke={disabled ? "#4a5568" : "white"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
