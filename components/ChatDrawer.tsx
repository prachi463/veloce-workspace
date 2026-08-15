"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Zap, Brain, Paperclip } from "lucide-react";
import clsx from "clsx";

type ModelKey = "groq" | "gemini" | "openai";

const MODELS: { key: ModelKey; label: string; hint: string; icon: React.ReactNode }[] = [
  { key: "groq", label: "Groq", hint: "Instant text", icon: <Zap className="h-3.5 w-3.5" /> },
  { key: "gemini", label: "Gemini", hint: "Vision & files", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { key: "openai", label: "OpenAI", hint: "Deep reasoning", icon: <Brain className="h-3.5 w-3.5" /> },
];

type ChatMessage = { role: "user" | "assistant"; content: string; model?: ModelKey };

export default function ChatDrawer() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<ModelKey>("groq");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Veloce study assistant. Ask me to explain a concept, debug code, or summarize your notes. Switch models above depending on whether you need speed, vision, or deep reasoning.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch(`/api/chat/${model}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `⚠️ ${err.error || "This model isn't configured yet. Add its API key to .env.local."}` },
        ]);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      setMessages((m) => [...m, { role: "assistant", content: "", model }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: assistantText, model };
          return copy;
        });
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [...m, { role: "assistant", content: "⚠️ Network error reaching the AI endpoint." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI chat"
        className={clsx(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] shadow-lg shadow-emerald-500/20",
          "hover:scale-105 active:scale-95 transition-transform",
          open && "hidden"
        )}
      >
        <MessageSquare className="h-6 w-6 text-black" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 flex h-[32rem] w-[22rem] max-w-[92vw] flex-col overflow-hidden rounded-2xl glass shadow-2xl"
            role="dialog"
            aria-label="AI chat assistant"
          >
            <div className="flex items-center justify-between border-b border-[var(--v-glass-border)] px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)]">
                  <Sparkles className="h-3.5 w-3.5 text-black" />
                </span>
                Veloce Assistant
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X className="h-4 w-4 text-[var(--v-text-dim)]" />
              </button>
            </div>

            <div className="flex gap-1.5 border-b border-[var(--v-glass-border)] px-3 py-2">
              {MODELS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setModel(m.key)}
                  className={clsx(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors",
                    model === m.key
                      ? "bg-[var(--v-emerald)] text-black font-medium"
                      : "text-[var(--v-text-dim)] hover:text-[var(--v-text)]"
                  )}
                  title={m.hint}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={clsx(
                    "max-w-[85%] rounded-xl px-3 py-2 leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "ml-auto bg-[var(--v-emerald)] text-black"
                      : "bg-[var(--v-obsidian-raised)] text-[var(--v-text)]"
                  )}
                >
                  {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-[var(--v-glass-border)] p-3">
              <button className="p-2 text-[var(--v-text-dim)] hover:text-[var(--v-text)]" aria-label="Attach file">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--v-text-dim)]"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                aria-label="Send message"
                className="rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] p-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4 text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
