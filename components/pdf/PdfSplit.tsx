"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors, Download, Loader2 } from "lucide-react";
import { downloadBlob } from "./PdfMerge";

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("1-2");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function parseRange(input: string, max: number): number[] {
    const out = new Set<number>();
    for (const part of input.split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.includes("-")) {
        const [a, b] = trimmed.split("-").map((n) => parseInt(n.trim(), 10));
        for (let i = a; i <= b; i++) if (i >= 1 && i <= max) out.add(i - 1);
      } else {
        const n = parseInt(trimmed, 10);
        if (n >= 1 && n <= max) out.add(n - 1);
      }
    }
    return Array.from(out).sort((a, b) => a - b);
  }

  async function split() {
    if (!file) {
      setError("Choose a PDF first.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const indices = parseRange(range, src.getPageCount());
      if (!indices.length) {
        setError("That page range didn't match any pages in this file.");
        setBusy(false);
        return;
      }
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      downloadBlob(new Blob([outBytes as unknown as BlobPart], { type: "application/pdf" }), "veloce-split.pdf");
    } catch {
      setError("Couldn't read that PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-1">
        <Scissors className="h-5 w-5 text-[var(--v-cyan)]" />
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium">Split / Extract Pages</h2>
      </div>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">Pull specific pages out into a new PDF, e.g. &ldquo;1-3, 7&rdquo;.</p>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[var(--v-emerald)] file:px-3 file:py-1.5 file:text-black"
        />
        <input
          value={range}
          onChange={(e) => setRange(e.target.value)}
          placeholder="Pages e.g. 1-3, 5"
          className="rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 text-sm outline-none focus:border-[var(--v-emerald)]"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        onClick={split}
        disabled={busy}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-2.5 text-sm font-medium text-black disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busy ? "Extracting…" : "Extract & download"}
      </button>
    </section>
  );
}
