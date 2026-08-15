"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, FileStack, X, Loader2 } from "lucide-react";

export default function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    setFiles((f) => [...f, ...picked]);
    e.target.value = "";
  }

  function removeAt(i: number) {
    setFiles((f) => f.filter((_, idx) => idx !== i));
  }

  async function merge() {
    if (files.length < 2) {
      setError("Add at least two PDF files to merge.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const outBytes = await merged.save();
      downloadBlob(new Blob([outBytes as unknown as BlobPart], { type: "application/pdf" }), "veloce-merged.pdf");
    } catch {
      setError("Couldn't merge those files — make sure each one is a valid PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-1">
        <FileStack className="h-5 w-5 text-[var(--v-emerald)]" />
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium">Merge PDFs</h2>
      </div>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">Combine multiple PDFs into one, in the order listed.</p>

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--v-glass-border)] p-8 text-center hover:border-[var(--v-emerald)] transition-colors">
        <Upload className="h-6 w-6 text-[var(--v-text-dim)]" />
        <span className="text-sm text-[var(--v-text-dim)]">Click to add PDF files</span>
        <input type="file" accept="application/pdf" multiple className="hidden" onChange={onSelect} />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-lg bg-[var(--v-obsidian-raised)] px-3 py-2 text-sm">
              <span className="truncate">{i + 1}. {f.name}</span>
              <button onClick={() => removeAt(i)} aria-label={`Remove ${f.name}`}>
                <X className="h-4 w-4 text-[var(--v-text-dim)] hover:text-red-400" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        onClick={merge}
        disabled={busy}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-2.5 text-sm font-medium text-black disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busy ? "Merging…" : "Merge & download"}
      </button>
    </section>
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
