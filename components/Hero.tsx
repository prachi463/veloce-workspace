"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Cpu } from "lucide-react";
import ParallaxGallery from "@/components/ParallaxGallery";

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden pt-36 pb-20">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--v-emerald), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute top-24 right-0 h-[24rem] w-[24rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--v-cyan), transparent 60%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-[var(--v-text-dim)]"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--v-emerald)]" />
          Zero uploads — every file stays in your browser
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          Fluid motion.
          <br />
          <span className="text-gradient">Instant intelligence.</span>
          <br />
          Local processing.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-center text-[var(--v-text-dim)] leading-relaxed"
        >
          Veloce Workspace is a privacy-first academic platform. PDF and document tools run
          entirely inside your browser memory, while a multi-model AI engine turns notes into
          decks, flashcards, and answers — without ever touching a server.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/tools/pdf"
            className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            Explore the tools <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:border-[var(--v-emerald)] transition-colors"
          >
            <Cpu className="h-4 w-4" /> Talk to the AI assistant
          </Link>
        </motion.div>
      </div>

      <ParallaxGallery />
    </section>
  );
}
