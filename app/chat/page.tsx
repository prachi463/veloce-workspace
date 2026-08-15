import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Chat with the Veloce multi-model AI assistant — Groq, Gemini, and OpenAI in one place.",
};

export default function ChatPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 pt-40 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">Multi-model assistant</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-4">
        Open the chat drawer
      </h1>
      <p className="text-[var(--v-text-dim)] leading-relaxed">
        The Veloce assistant lives in the floating drawer in the bottom-right corner of every page —
        click it to switch between Groq, Gemini, and OpenAI depending on whether you need speed,
        multimodal analysis, or deep reasoning.
      </p>
    </div>
  );
}
