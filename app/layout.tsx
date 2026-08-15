import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://veloce-workspace.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Veloce Workspace — Fluid Motion. Instant Intelligence. Local Processing.",
    template: "%s · Veloce Workspace",
  },
  description:
    "A privacy-first academic and productivity workspace. Every file is processed locally in your browser — PDF tools, AI-assisted study decks, flashcards, and calculators, with zero uploads.",
  keywords: [
    "Veloce Workspace",
    "student productivity tool",
    "client-side PDF tools",
    "privacy-first AI study assistant",
    "final year B.Tech project",
  ],
  authors: [{ name: "Prachi Verma" }],
  openGraph: {
    title: "Veloce Workspace",
    description: "Fluid Motion. Instant Intelligence. Local Processing.",
    url: siteUrl,
    siteName: "Veloce Workspace",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veloce Workspace",
    description: "Fluid Motion. Instant Intelligence. Local Processing.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-[var(--v-obsidian)] text-[var(--v-text)] font-[family-name:var(--font-body)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--v-emerald)] focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatDrawer />
      </body>
    </html>
  );
}
