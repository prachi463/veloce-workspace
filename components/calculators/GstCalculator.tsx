"use client";

import { useMemo, useState } from "react";

const SLABS = [5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState<string>("1000");
  const [rate, setRate] = useState<number>(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    if (mode === "exclusive") {
      const gst = (amt * rate) / 100;
      return { base: amt, gst, total: amt + gst, cgst: gst / 2, sgst: gst / 2 };
    }
    const base = amt / (1 + rate / 100);
    const gst = amt - base;
    return { base, gst, total: amt, cgst: gst / 2, sgst: gst / 2 };
  }, [amount, rate, mode]);

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-medium mb-1">GST Calculator</h2>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">Split CGST/SGST from an inclusive or exclusive amount.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs text-[var(--v-text-dim)]">Amount (₹)</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 outline-none focus:border-[var(--v-emerald)]"
          />
        </label>

        <label className="block">
          <span className="text-xs text-[var(--v-text-dim)]">GST Rate</span>
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 outline-none focus:border-[var(--v-emerald)]"
          >
            {SLABS.map((s) => (
              <option key={s} value={s}>{s}%</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex gap-2 text-xs">
        {(["exclusive", "inclusive"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              mode === m ? "bg-[var(--v-emerald)] text-black font-medium" : "glass text-[var(--v-text-dim)]"
            }`}
          >
            {m === "exclusive" ? "Add GST" : "Amount includes GST"}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Base", result.base],
          ["CGST", result.cgst],
          ["SGST", result.sgst],
          ["Total", result.total],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-xl bg-[var(--v-obsidian-raised)] p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-[var(--v-text-dim)]">{label}</p>
            <p className="mt-1 font-[family-name:var(--font-mono)] text-lg text-[var(--v-emerald)]">
              ₹{(val as number).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
