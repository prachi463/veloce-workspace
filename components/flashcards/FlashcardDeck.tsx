"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

type Card = { id: string; front: string; back: string; box: number; due: number };

const STORAGE_KEY = "veloce-flashcards";
const SEED: Card[] = [
  { id: "1", front: "What is a Web Worker?", back: "A background JS thread that runs scripts off the main thread, keeping the UI responsive.", box: 1, due: 0 },
  { id: "2", front: "RRF in retrieval systems?", back: "Reciprocal Rank Fusion — merges rankings from multiple retrievers (e.g. FAISS + BM25) by rank position.", box: 1, due: 0 },
  { id: "3", front: "WASM in one line?", back: "A binary instruction format that runs near-native-speed code in the browser sandbox.", box: 1, due: 0 },
];

export default function FlashcardDeck() {
  const [cards, setCards] = useState<Card[]>(SEED);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // Reading persisted cards from localStorage after mount is the only option
  // (localStorage doesn't exist during SSR), so this intentionally sets state
  // once on mount rather than during render.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCards(JSON.parse(saved));
    } catch {
      // ignore malformed/missing storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const card = cards[index];

  function grade(known: boolean) {
    setCards((cs) =>
      cs.map((c, i) => (i === index ? { ...c, box: known ? Math.min(5, c.box + 1) : 1 } : c))
    );
    setFlipped(false);
    setIndex((i) => (i + 1) % cards.length);
  }

  function addCard() {
    if (!front.trim() || !back.trim()) return;
    setCards((cs) => [...cs, { id: crypto.randomUUID(), front, back, box: 1, due: 0 }]);
    setFront("");
    setBack("");
    setShowForm(false);
  }

  if (!card) return <p className="text-center text-[var(--v-text-dim)]">No cards yet — add one to get started.</p>;

  return (
    <div>
      <div className="mx-auto max-w-md" style={{ perspective: "1200px" }}>
        <motion.button
          onClick={() => setFlipped((f) => !f)}
          className="relative h-72 w-full text-left"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-2xl glass p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-xs text-[var(--v-text-dim)]">Box {card.box} · Front</span>
            <p className="font-[family-name:var(--font-display)] text-2xl leading-snug">{card.front}</p>
            <span className="flex items-center gap-1 text-xs text-[var(--v-text-dim)]">
              <RotateCw className="h-3 w-3" /> tap to flip
            </span>
          </div>
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] p-6 text-black"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-xs opacity-70">Answer</span>
            <p className="text-lg leading-snug font-medium">{card.back}</p>
            <span className="text-xs opacity-70">tap to flip back</span>
          </div>
        </motion.button>
      </div>

      <div className="mx-auto mt-6 flex max-w-md items-center justify-between">
        <button
          onClick={() => { setFlipped(false); setIndex((i) => (i - 1 + cards.length) % cards.length); }}
          className="p-2 rounded-full glass"
          aria-label="Previous card"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          <button onClick={() => grade(false)} className="rounded-full bg-red-500/15 text-red-400 px-4 py-2 text-sm">Still learning</button>
          <button onClick={() => grade(true)} className="rounded-full bg-[var(--v-emerald)]/15 text-[var(--v-emerald)] px-4 py-2 text-sm">Got it</button>
        </div>
        <button
          onClick={() => { setFlipped(false); setIndex((i) => (i + 1) % cards.length); }}
          className="p-2 rounded-full glass"
          aria-label="Next card"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--v-text-dim)]">Card {index + 1} of {cards.length}</p>

      <div className="mx-auto mt-10 max-w-md">
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-sm text-[var(--v-emerald)] hover:underline mx-auto">
            <Plus className="h-4 w-4" /> Add a card
          </button>
        ) : (
          <div className="glass rounded-2xl p-5 space-y-3">
            <input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Front (question)"
              className="w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 text-sm outline-none focus:border-[var(--v-emerald)]"
            />
            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Back (answer)"
              rows={2}
              className="w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 text-sm outline-none focus:border-[var(--v-emerald)]"
            />
            <div className="flex gap-2">
              <button onClick={addCard} className="rounded-full bg-[var(--v-emerald)] text-black px-4 py-1.5 text-sm font-medium">Save card</button>
              <button onClick={() => setShowForm(false)} className="rounded-full glass px-4 py-1.5 text-sm">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
