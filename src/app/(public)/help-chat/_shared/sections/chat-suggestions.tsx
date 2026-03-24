"use client";

// ─── Chat Suggestion Chips ────────────────────────────────────────────────────

interface ChatSuggestionsProps {
  suggestions: string[];
  accentColor: string;
  onSend: (text: string) => void;
}

export function ChatSuggestions({
  suggestions,
  accentColor,
  onSend,
}: ChatSuggestionsProps) {
  return (
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
          onClick={() => onSend(s)}
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
          // CSS hover handled by .hw-btn-sug class in parent <style>
          data-accent={accentColor}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
