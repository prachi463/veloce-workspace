import type { Metadata } from "next";
import PdfMerge from "@/components/pdf/PdfMerge";
import PdfSplit from "@/components/pdf/PdfSplit";
import ImageToPdf from "@/components/pdf/ImageToPdf";

export const metadata: Metadata = {
  title: "PDF Suite — Merge, Split & Convert",
  description: "Merge, split, and convert PDFs entirely inside your browser. No file is ever uploaded to a server.",
};

export default function PdfToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 pt-32 pb-24">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">Privacy-first PDF Suite</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">Every byte stays on your machine</h1>
        <p className="mt-3 text-[var(--v-text-dim)] max-w-xl mx-auto">
          Powered by <code className="font-[family-name:var(--font-mono)] text-[var(--v-cyan)]">pdf-lib</code> running
          entirely client-side. Nothing is uploaded.
        </p>
      </header>

      <div className="space-y-8">
        <PdfMerge />
        <PdfSplit />
        <ImageToPdf />
      </div>
    </div>
  );
}
