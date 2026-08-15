"use client";

import { useMemo, useState } from "react";

// Simplified illustrative slabs (FY 2024-25, individuals below 60). For guidance only — not tax advice.
function newRegimeTax(income: number) {
  const slabs: [number, number, number][] = [
    [0, 300000, 0],
    [300000, 700000, 0.05],
    [700000, 1000000, 0.1],
    [1000000, 1200000, 0.15],
    [1200000, 1500000, 0.2],
    [1500000, Infinity, 0.3],
  ];
  return computeSlabTax(income, slabs);
}

function oldRegimeTax(income: number, deductions: number) {
  const taxable = Math.max(0, income - deductions - 50000); // standard deduction approx.
  const slabs: [number, number, number][] = [
    [0, 250000, 0],
    [250000, 500000, 0.05],
    [500000, 1000000, 0.2],
    [1000000, Infinity, 0.3],
  ];
  return computeSlabTax(taxable, slabs);
}

function computeSlabTax(income: number, slabs: [number, number, number][]) {
  let tax = 0;
  for (const [from, to, rate] of slabs) {
    if (income > from) {
      tax += (Math.min(income, to) - from) * rate;
    }
  }
  return tax * 1.04; // 4% health & education cess
}

export default function TaxRegimeCalculator() {
  const [income, setIncome] = useState("1200000");
  const [deductions, setDeductions] = useState("150000");

  const { oldTax, newTax, better } = useMemo(() => {
    const inc = parseFloat(income) || 0;
    const ded = parseFloat(deductions) || 0;
    const oldTax = oldRegimeTax(inc, ded);
    const newTax = newRegimeTax(inc);
    return { oldTax, newTax, better: oldTax <= newTax ? "old" : "new" };
  }, [income, deductions]);

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-medium mb-1">Old vs New Tax Regime</h2>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">
        Illustrative comparison using simplified FY 2024-25 slabs. Not a substitute for professional tax advice.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs text-[var(--v-text-dim)]">Annual gross income (₹)</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="mt-1 w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 outline-none focus:border-[var(--v-emerald)]"
          />
        </label>
        <label className="block">
          <span className="text-xs text-[var(--v-text-dim)]">Deductions under old regime (80C, HRA, etc.)</span>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="mt-1 w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2 outline-none focus:border-[var(--v-emerald)]"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className={`rounded-xl p-4 ${better === "old" ? "bg-[var(--v-emerald)]/15 border border-[var(--v-emerald)]" : "bg-[var(--v-obsidian-raised)]"}`}>
          <p className="text-xs text-[var(--v-text-dim)]">Old regime</p>
          <p className="mt-1 font-[family-name:var(--font-mono)] text-2xl">₹{oldTax.toFixed(0)}</p>
        </div>
        <div className={`rounded-xl p-4 ${better === "new" ? "bg-[var(--v-emerald)]/15 border border-[var(--v-emerald)]" : "bg-[var(--v-obsidian-raised)]"}`}>
          <p className="text-xs text-[var(--v-text-dim)]">New regime</p>
          <p className="mt-1 font-[family-name:var(--font-mono)] text-2xl">₹{newTax.toFixed(0)}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--v-text-dim)]">
        Based on these numbers, the <span className="text-[var(--v-emerald)] font-medium">{better} regime</span> results in lower tax.
      </p>
    </section>
  );
}
