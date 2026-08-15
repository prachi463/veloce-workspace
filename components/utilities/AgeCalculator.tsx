"use client";

import { useMemo, useState } from "react";

export default function AgeCalculator() {
  const [birth, setBirth] = useState("2003-06-15");

  const breakdown = useMemo(() => {
    const start = new Date(birth);
    const now = new Date();
    if (isNaN(start.getTime()) || start > now) return null;

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays, totalWeeks: Math.floor(totalDays / 7), totalHours: totalDays * 24 };
  }, [birth]);

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-medium mb-1">Age & Duration Breakdown</h2>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">Pick a date to see the exact elapsed time.</p>

      <input
        type="date"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        className="w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2.5 outline-none focus:border-[var(--v-emerald)]"
      />

      {breakdown && (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            ["Years", breakdown.years],
            ["Months", breakdown.months],
            ["Days", breakdown.days],
            ["Total days", breakdown.totalDays],
            ["Weeks", breakdown.totalWeeks],
            ["Hours", breakdown.totalHours],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-xl bg-[var(--v-obsidian-raised)] p-3 text-center">
              <p className="text-[10px] uppercase tracking-wide text-[var(--v-text-dim)]">{label}</p>
              <p className="mt-1 font-[family-name:var(--font-mono)] text-[var(--v-emerald)]">{val.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
