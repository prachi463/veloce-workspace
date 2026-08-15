import Link from "next/link";
import { Zap } from "lucide-react";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--v-glass-border)] mt-24">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-[family-name:var(--font-display)] font-semibold mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)]">
              <Zap className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
            </span>
            Veloce Workspace
          </div>
          <p className="text-[var(--v-text-dim)] leading-relaxed">
            Fluid motion. Instant intelligence. Local processing. Your files never leave your browser.
          </p>
        </div>

        <div>
          <p className="font-medium mb-3 text-[var(--v-text)]">Tools</p>
          <ul className="space-y-2 text-[var(--v-text-dim)]">
            <li><Link href="/tools/pdf" className="hover:text-[var(--v-emerald)]">PDF Suite</Link></li>
            <li><Link href="/tools/calculators" className="hover:text-[var(--v-emerald)]">Calculators</Link></li>
            <li><Link href="/tools/qr" className="hover:text-[var(--v-emerald)]">QR & Utilities</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3 text-[var(--v-text)]">Study</p>
          <ul className="space-y-2 text-[var(--v-text-dim)]">
            <li><Link href="/flashcards" className="hover:text-[var(--v-emerald)]">Flashcards</Link></li>
            <li><Link href="/presentations" className="hover:text-[var(--v-emerald)]">AI Presentation Decks</Link></li>
            <li><Link href="/chat" className="hover:text-[var(--v-emerald)]">AI Chat</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3 text-[var(--v-text)]">Project</p>
          <div className="flex gap-3">
            <a href="https://github.com/prachi463" target="_blank" rel="noreferrer" className="p-2 rounded-md glass hover:border-[var(--v-emerald)]" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/prachi-verma-aiml" target="_blank" rel="noreferrer" className="p-2 rounded-md glass hover:border-[var(--v-emerald)]" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--v-glass-border)] py-5 text-center text-xs text-[var(--v-text-dim)]">
        © {new Date().getFullYear()} Veloce Workspace — Built as a final-year B.Tech capstone project.
      </div>
    </footer>
  );
}
