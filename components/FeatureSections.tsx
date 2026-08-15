import Link from "next/link";
import { ShieldCheck, BrainCircuit, Layers3, ArrowRight } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% client-side privacy",
    body: "PDF, image, and document manipulation runs locally using WebAssembly and Web Workers. No file is ever transmitted to a server for processing.",
  },
  {
    icon: BrainCircuit,
    title: "Multi-model intelligence",
    body: "Groq for sub-second replies, Gemini for multimodal document and diagram analysis, and OpenAI for complex reasoning — routed per task, not locked to one vendor.",
  },
  {
    icon: Layers3,
    title: "Human-crafted interface",
    body: "A floating wave navbar, glass-panel depth, and a parallax card gallery replace the rigid corporate dashboard template.",
  },
];

export default function FeatureSections() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-6">
              <p.icon className="h-6 w-6 text-[var(--v-emerald)] mb-4" />
              <h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--v-text-dim)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="glass rounded-3xl p-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-3">
            Built for the semester crunch
          </h2>
          <p className="mx-auto max-w-xl text-[var(--v-text-dim)] mb-8">
            Convert lecture notes into flashcards, generate a slide deck before class, or run GST
            and tax-regime numbers for a project — all in the same fluid workspace.
          </p>
          <Link
            href="/tools/pdf"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-3 text-sm font-medium text-black"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
