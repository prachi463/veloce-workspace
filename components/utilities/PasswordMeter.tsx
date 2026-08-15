"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function entropyBits(pw: string): number {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  if (!pool) return 0;
  return pw.length * Math.log2(pool);
}

function label(bits: number) {
  if (bits === 0) return { text: "—", color: "var(--v-text-dim)" };
  if (bits < 28) return { text: "Very weak", color: "#ef4444" };
  if (bits < 36) return { text: "Weak", color: "#f97316" };
  if (bits < 60) return { text: "Reasonable", color: "var(--v-amber)" };
  if (bits < 80) return { text: "Strong", color: "var(--v-cyan)" };
  return { text: "Very strong", color: "var(--v-emerald)" };
}

export default function PasswordMeter() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const bits = useMemo(() => entropyBits(pw), [pw]);
  const { text, color } = label(bits);
  const pct = Math.min(100, (bits / 90) * 100);

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-medium mb-1">Password Strength Meter</h2>
      <p className="text-sm text-[var(--v-text-dim)] mb-5">
        Entropy is estimated locally from length and character variety — your password is never sent anywhere.
      </p>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Type a password to test…"
          className="w-full rounded-lg bg-[var(--v-obsidian-raised)] border border-[var(--v-glass-border)] px-3 py-2.5 pr-10 outline-none focus:border-[var(--v-emerald)]"
        />
        <button
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--v-text-dim)]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-[var(--v-obsidian-raised)] overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-[var(--v-text-dim)]">
        <span style={{ color }}>{text}</span>
        <span>{bits.toFixed(0)} bits of entropy</span>
      </div>
    </section>
  );
}
