"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import PasswordMeter from "@/components/utilities/PasswordMeter";
import AgeCalculator from "@/components/utilities/AgeCalculator";

export default function QrPage() {
  const [text, setText] = useState("https://veloce-workspace.vercel.app");
  const [dataUrl, setDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text || " ", {
      width: 260,
      margin: 1,
      color: { dark: "#0d0f12", light: "#e7ebef" },
    });
    QRCode.toDataURL(text || " ", { width: 800, margin: 1 }).then(setDataUrl);
  }, [text]);

  function download() {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "veloce-qr.png";
    a.click();
  }

  return (
    <div className="max-w-xl mx-auto px-5 pt-32 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">Utility generator</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-3">QR Code Generator</h1>
      <p className="text-[var(--v-text-dim)] mb-8">Generated instantly in your browser — nothing is sent anywhere.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Paste a URL or any text…"
        className="w-full rounded-xl bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-4 py-3 outline-none focus:border-[var(--v-emerald)]"
      />

      <div className="mt-8 flex justify-center rounded-2xl glass p-6">
        <canvas ref={canvasRef} className="rounded-lg" />
      </div>

      <button
        onClick={download}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-3 text-sm font-medium text-black"
      >
        <Download className="h-4 w-4" /> Download SVG-quality PNG
      </button>

      <div className="mt-16 text-left space-y-8">
        <PasswordMeter />
        <AgeCalculator />
      </div>
    </div>
  );
}
