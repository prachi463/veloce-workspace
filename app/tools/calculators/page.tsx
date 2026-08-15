import type { Metadata } from "next";
import GstCalculator from "@/components/calculators/GstCalculator";
import TaxRegimeCalculator from "@/components/calculators/TaxRegimeCalculator";
import GpaCalculator from "@/components/calculators/GpaCalculator";

export const metadata: Metadata = {
  title: "Calculators — GST, Income Tax & GPA",
  description: "GST breakdown, Old vs New income tax regime comparison, and a CGPA/GPA planner. All calculations run instantly in your browser.",
};

export default function CalculatorsPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 pt-32 pb-24">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">Academic & financial calculators</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">Numbers, worked out instantly</h1>
        <p className="mt-3 text-[var(--v-text-dim)] max-w-xl mx-auto">
          No sign-up, no server round-trip — every field recalculates live as you type.
        </p>
      </header>

      <div className="space-y-8">
        <GstCalculator />
        <TaxRegimeCalculator />
        <GpaCalculator />
      </div>
    </div>
  );
}
