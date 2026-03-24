// ─── Shared Types ─────────────────────────────────────────────────────────────

// ── API / Route ───────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

export interface Doc {
  id: number;
  title: string;
  url: string;
  category: string;
  content: string;
}

// ── UI / Widget ───────────────────────────────────────────────────────────────

export interface Source {
  id: number;
  title: string;
  url: string;
  category: string;
}

export interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
  isStreaming?: boolean;
}

export interface HelpWidgetProps {
  title?: string;
  placeholder?: string;
  suggestions?: string[];
  accentColor?: string;
}
