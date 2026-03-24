"use client";

// ─── Chat Panel Header ────────────────────────────────────────────────────────

interface ChatHeaderProps {
  title: string;
  accentColor: string;
  onClose: () => void;
}

export function ChatHeader({ title, accentColor, onClose }: ChatHeaderProps) {
  return (
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
        onClick={onClose}
        aria-label="Kapat"
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
  );
}
