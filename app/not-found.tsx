import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--v-emerald)] mb-3">404</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-3">
        This page drifted off-grid
      </h1>
      <p className="text-[var(--v-text-dim)] mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Head back to the workspace.
      </p>
      <Link
        href="/"
        className="rounded-full bg-gradient-to-br from-[var(--v-emerald)] to-[var(--v-cyan)] px-6 py-3 text-sm font-medium text-black"
      >
        Back to home
      </Link>
    </div>
  );
}
