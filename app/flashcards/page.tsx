import type { Metadata } from "next";
import FlashcardDeck from "@/components/flashcards/FlashcardDeck";

export const metadata: Metadata = {
  title: "Flashcards — 3D Study Deck",
  description: "Turn your notes into interactive, flip-animated 3D flashcards with spaced-repetition tracking.",
};

export default function FlashcardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 pt-32 pb-24">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">Active recall</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">3D Flashcard Deck</h1>
        <p className="mt-3 text-[var(--v-text-dim)] max-w-xl mx-auto">
          Build a deck by hand, or generate one from the AI chat and paste it in. Cards you mark
          &ldquo;hard&rdquo; resurface sooner.
        </p>
      </header>
      <FlashcardDeck />
    </div>
  );
}
