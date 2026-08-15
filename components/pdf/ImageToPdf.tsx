"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { ImagePlus, Download, Loader2, X } from "lucide-react";
import { downloadBlob } from "./PdfMerge";

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles((f) => [...f, ...Array.from(e.target.files || [])]);
    e.target.value = "";
  }

  async function convert() {
    if (!files.length) {
      setError("Add at least one image.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const pdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const isPng = file.type.includes("png");
        const image = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const outBytes = await pdf.save();
      downloadBlob(new Blob([outBytes as unknown as BlobPart], { type: "application/pdf" }), "veloce-images.pdf");
    } catch {
      setError("Couldn't convert one of those images — use JPG or PNG files.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-1">
        <ImagePlus className="h-5 w-5 text-[var(--v-amber)]" />
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium">Image → PDF</h2>
      </div>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">JPG or PNG images, one per page, in the order added.</p>

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--v-glass-border)] p-8 text-center hover:border-[var(--v-emerald)] transition-colors">
        <ImagePlus className="h-6 w-6 text-[var(--v-text-dim)]" />
        <span className="text-sm text-[var(--v-text-dim)]">Click to add images</span>
        <input type="file" accept="image/png,image/jpeg" multiple className="hidden" onChange={onSelect} />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-1.5 rounded-full bg-[var(--v-obsidian-raised)] px-3 py-1 text-xs">
              {f.name}
              <button onClick={() => setFiles((fs) => fs.filter((_, idx) => idx !== i))} aria-label={`Remove ${f.name}`}>
                <X className="h-3 w-3 text-[var(--v-text-dim)] hover:text-red-400" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        onClick={convert}
        disabled={busy}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-2.5 text-sm font-medium text-black disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busy ? "Converting…" : "Convert & download"}
      </button>
    </section>
  );
}
