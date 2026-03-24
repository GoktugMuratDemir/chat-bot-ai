// ─── Help Chat Configuration ──────────────────────────────────────────────────
// Tüm ayarları buradan değiştirebilirsiniz.

export const CHAT_CONFIG = {
  // ── LLM / Ollama ────────────────────────────────────────────────────────────
  apiUrl: "https://speaking.chat.eltaexams.com/api/chat",
  model: "qwen2.5:7b",
  // model: "qwen3.5:9b",
  /** Streaming devre dışı bırakmak için false yapın */
  stream: true,

  // ── RAG / Bağlam ────────────────────────────────────────────────────────────
  /** Arama sonuçlarından kaç belge bağlam olarak gönderilsin */
  maxContextDocs: 3,
  /** Sohbet geçmişinden kaç mesaj gönderilsin */
  maxHistoryMessages: 6,

  // ── Akış / Yazı Animasyonu ──────────────────────────────────────────────────
  /** Her karakterin ekrana gelme hızı (ms) */
  typewriterDelayMs: 18,
  /** Yazma animasyonu bitişini beklerken polling aralığı (ms) */
  pollingIntervalMs: 30,

  // ── Widget Varsayılanları ───────────────────────────────────────────────────
  defaultTitle: "Yardım Asistanı",
  defaultPlaceholder: "Sorunuzu yazın…",
  defaultAccentColor: "#6366f1",

  // ── Widget Boyutları ────────────────────────────────────────────────────────
  widgetWidth: 390,
  widgetHeight: 620,
  fabBottom: 28,
  fabRight: 28,
};
