"use client";

import { useState } from "react";
import { Sparkles, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { heading: string; bullets: string[] };
type Deck = { title: string; slides: Slide[] };

export default function PresentationsPage() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(6);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setDeck(null);
    try {
      const res = await fetch("/api/presentations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, slideCount: count }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setDeck(data);
      setCurrent(0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function exportPptx() {
    if (!deck) return;
    const PptxGenJS = (await import("pptxgenjs")).default;
    const pres = new PptxGenJS();
    pres.defineSlideMaster({
      title: "VELOCE",
      background: { color: "0D0F12" },
    });

    const title = pres.addSlide();
    title.background = { color: "0D0F12" };
    title.addText(deck.title, { x: 0.5, y: 2, w: 9, h: 1.5, fontSize: 36, bold: true, color: "10B981" });

    for (const slide of deck.slides) {
      const s = pres.addSlide();
      s.background = { color: "0D0F12" };
      s.addText(slide.heading, { x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 26, bold: true, color: "06B6D4" });
      s.addText(slide.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
        x: 0.6,
        y: 1.4,
        w: 8.8,
        h: 4.5,
        fontSize: 18,
        color: "E7EBEF",
      });
    }

    await pres.writeFile({ fileName: `${deck.title.replace(/\s+/g, "-").toLowerCase()}.pptx` });
  }

  return (
    <div className="max-w-4xl mx-auto px-5 pt-32 pb-24">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">AI Presentation Engine</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">Notes to slides, in one pass</h1>
        <p className="mt-3 text-[var(--v-text-dim)] max-w-xl mx-auto">
          Paste a topic or lecture notes, choose a slide count, and export a ready-to-present deck.
        </p>
      </header>

      <div className="glass rounded-2xl p-6">
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          placeholder="e.g. Reciprocal Rank Fusion for hybrid retrieval systems…"
          className="w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2.5 outline-none focus:border-[var(--v-emerald)]"
        />
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-[var(--v-text-dim)]">
            Slides
            <input
              type="number"
              min={3}
              max={15}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-16 rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-2 py-1"
            />
          </label>
          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-2.5 text-sm font-medium text-black disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Generating…" : "Generate deck"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>

      {deck && (
        <div className="mt-8">
          <div className="glass rounded-2xl p-8 aspect-video flex flex-col justify-center">
            {current === 0 ? (
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-gradient text-center">
                {deck.title}
              </h2>
            ) : (
              <>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--v-cyan)] mb-4">
                  {deck.slides[current - 1].heading}
                </h3>
                <ul className="space-y-2 text-[var(--v-text)]">
                  {deck.slides[current - 1].bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--v-emerald)]">▸</span> {b}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              className="p-2 rounded-full glass"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-[var(--v-text-dim)]">
              Slide {current + 1} of {deck.slides.length + 1}
            </span>
            <button
              onClick={() => setCurrent((c) => Math.min(deck.slides.length, c + 1))}
              className="p-2 rounded-full glass"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={exportPptx}
            className="mt-6 mx-auto flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-2.5 text-sm font-medium text-black"
          >
            <Download className="h-4 w-4" /> Export as .pptx
          </button>
        </div>
      )}
    </div>
  );
}
