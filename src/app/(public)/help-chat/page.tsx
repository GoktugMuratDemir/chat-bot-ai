"use client";

import { HelpWidget } from "./_shared/components";

export default function HelpChatPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ textAlign: "center", color: "#2d3748" }}>
        <div
          style={{
            fontSize: 14,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
            color: "#4a5568",
          }}
        >
          StoryMind Yardım
        </div>
        <div style={{ fontSize: 12, color: "#2d3748" }}>
          Sağ alttaki butona tıklayın →
        </div>
      </div>

      <HelpWidget />
    </main>
  );
}
