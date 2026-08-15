"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const LINKS = [
  { href: "/tools/pdf", label: "PDF Suite" },
  { href: "/tools/calculators", label: "Calculators" },
  { href: "/tools/qr", label: "QR & Utilities" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/presentations", label: "AI Decks" },
];

// Flat and "wave" SVG path states for the navbar's bottom edge.
const FLAT_PATH = "M0,32 C 300,32 900,32 1440,32 L1440,0 L0,0 Z";
const WAVE_PATH =
  "M0,24 C 180,44 360,4 540,24 C 720,44 900,4 1080,24 C 1260,44 1350,30 1440,20 L1440,0 L0,0 Z";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const morph = useTransform(scrollY, [0, 160], [0, 1]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  const d = useTransform(morph, (v) => interpolatePath(FLAT_PATH, WAVE_PATH, v));

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className={`relative transition-[padding] duration-300 ${scrolled ? "py-1" : "py-3"}`}>
        <div className="absolute inset-0 -z-10">
          <svg
            viewBox="0 0 1440 32"
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="navFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0d0f12" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#0d0f12" stopOpacity="0.92" />
              </linearGradient>
            </defs>
            <motion.path d={d} fill="url(#navFill)" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#navStroke)"
              strokeWidth="1"
              opacity={morph}
            />
            <defs>
              <linearGradient id="navStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 backdrop-blur-md" style={{ WebkitBackdropFilter: "blur(12px)" }} />
        </div>

        <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] font-semibold text-lg tracking-tight">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)]">
              <Zap className="h-4 w-4 text-black" strokeWidth={2.5} />
            </span>
            Veloce<span className="text-gradient">Workspace</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm text-[var(--v-text-dim)]">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--v-text)] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/chat"
              className="text-sm px-4 py-2 rounded-full glass hover:border-[var(--v-emerald)] transition-colors"
            >
              Open AI Chat
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-md glass"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-1 rounded-2xl glass p-4 flex flex-col gap-3"
          >
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm py-1">
                {l.label}
              </Link>
            ))}
            <Link href="/chat" onClick={() => setOpen(false)} className="text-sm py-1 text-[var(--v-emerald)]">
              Open AI Chat →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Naive per-command linear interpolation between two same-shaped SVG path strings.
function interpolatePath(a: string, b: string, t: number): string {
  const numsA = a.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const numsB = b.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  if (numsA.length !== numsB.length) return t > 0.5 ? b : a;
  let i = 0;
  return a.replace(/-?\d+(\.\d+)?/g, () => {
    const interpolated = numsA[i] + (numsB[i] - numsA[i]) * t;
    i += 1;
    return interpolated.toFixed(2);
  });
}
