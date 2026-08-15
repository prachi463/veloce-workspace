"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileStack, Sparkles, Calculator, QrCode, Layers, Presentation } from "lucide-react";

const CARDS = [
  { title: "PDF Suite", desc: "Merge, split & compress — client-side only", icon: FileStack, depth: 40 },
  { title: "AI Chat", desc: "Groq, Gemini & OpenAI in one drawer", icon: Sparkles, depth: -30 },
  { title: "Calculators", desc: "GST, tax regimes, GPA planning", icon: Calculator, depth: 55 },
  { title: "QR & Utilities", desc: "Generators built for daily use", icon: QrCode, depth: -20 },
  { title: "Flashcards", desc: "3D flip cards with spaced repetition", icon: Layers, depth: 35 },
  { title: "AI Decks", desc: "Notes to slides in one pass", icon: Presentation, depth: -45 },
];

export default function ParallaxGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <div ref={ref} className="relative mt-24 max-w-6xl mx-auto px-5" style={{ perspective: "1400px" }}>
      <motion.div
        style={{ rotateX: rotate, transformStyle: "preserve-3d" }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {CARDS.map((card, i) => (
          <GalleryCard key={card.title} {...card} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </div>
  );
}

function GalleryCard({
  title,
  desc,
  icon: Icon,
  depth,
  index,
  scrollYProgress,
}: {
  title: string;
  desc: string;
  icon: React.ElementType;
  depth: number;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -3 : 3, index % 2 === 0 ? 3 : -3]);

  return (
    <motion.div
      style={{ y, rotateZ, translateZ: 20 }}
      whileHover={{ translateZ: 50, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="glass rounded-2xl p-5 group"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--v-emerald)]/20 to-[var(--v-cyan)]/20 text-[var(--v-emerald)] group-hover:from-[var(--v-emerald)] group-hover:to-[var(--v-cyan)] group-hover:text-black transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-[family-name:var(--font-display)] font-medium">{title}</p>
      <p className="mt-1 text-sm text-[var(--v-text-dim)] leading-snug">{desc}</p>
    </motion.div>
  );
}
