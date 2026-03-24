import { CHAT_CONFIG } from "../config";
import { DOCS } from "./knowledge-base";
import type { Doc } from "../types";

// ─── Keyword-based RAG Retrieval ──────────────────────────────────────────────

export function retrieveDocs(query: string): Doc[] {
  const q = query.toLowerCase();
  return DOCS.filter(
    (doc) =>
      doc.content.toLowerCase().includes(q) ||
      doc.title.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q),
  ).slice(0, CHAT_CONFIG.maxContextDocs);
}
