"use client";

// ─── Chat FAB (Floating Action Button) ───────────────────────────────────────

interface ChatFabProps {
  accentColor: string;
  fabBottom: number;
  fabRight: number;
  onClick: () => void;
}

export function ChatFab({
  accentColor,
  fabBottom,
  fabRight,
  onClick,
}: ChatFabProps) {
  return (
    <button
      className="hw-fab"
      onClick={onClick}
      aria-label="Yardım Asistanını Aç"
      style={{
        position: "fixed",
        bottom: fabBottom,
        right: fabRight,
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
  );
}
