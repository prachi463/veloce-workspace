# Veloce Workspace

**Fluid Motion. Instant Intelligence. Local Processing.**

A privacy-first academic and productivity platform built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS. Document tools run entirely client-side in your browser —
no file is ever uploaded to a server. A multi-model AI layer (Groq, Gemini, OpenAI) powers
a floating chat assistant and an AI presentation-deck generator.

Built as a final-year B.Tech capstone project.

---

## ✨ What's included and working right now

| Feature | Status |
|---|---|
| Fluid wave navbar (SVG path-morph on scroll) | ✅ Fully working |
| 3D scroll parallax hero gallery | ✅ Fully working |
| PDF Suite — merge, split/extract pages, image → PDF | ✅ Fully working, 100% client-side |
| GST calculator | ✅ Fully working |
| Old vs New income tax regime comparison | ✅ Fully working (illustrative slabs — not tax advice) |
| GPA / CGPA planner | ✅ Fully working |
| QR code generator | ✅ Fully working, client-side |
| Password entropy strength meter | ✅ Fully working, client-side |
| Age / duration breakdown tool | ✅ Fully working |
| 3D flip flashcard deck with spaced repetition | ✅ Fully working (saved to `localStorage`) |
| Multi-model AI chat drawer (Groq / Gemini / OpenAI) | ⚙️ Fully wired — needs **your own API key(s)** in `.env.local` |
| AI presentation deck generator + `.pptx` export | ⚙️ Fully wired — needs **your own OpenAI key** |
| Prisma schema (chat history, notes, decks, flashcard sets) | ⚙️ Schema ready — needs **your own Postgres `DATABASE_URL`** to persist data |
| SEO (sitemap, robots.txt, OpenGraph image) | ✅ Fully working |

The site **builds and deploys successfully with zero environment variables set.** Every
AI-dependent feature simply shows a clear "not configured" message until you add its key —
nothing crashes, nothing is faked.

---

## 🛠 Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, custom design tokens (Slate Obsidian / Nebula Emerald / Fluid Cyan)
- **Animation:** Framer Motion (wave navbar, parallax gallery, 3D flip cards)
- **Client-side documents:** `pdf-lib`, `qrcode`, `pptxgenjs`
- **Icons:** `lucide-react`
- **Database:** PostgreSQL via Prisma ORM (optional — only needed for persistence)
- **AI:** Groq, Google Gemini, and OpenAI APIs, called from Edge API routes with streaming

---

## 🚀 Getting started locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add whichever keys you have. **None are required to run the site** —
add them incrementally as you want each feature to go live:

- `GROQ_API_KEY` — get one free at [console.groq.com](https://console.groq.com)
- `GEMINI_API_KEY` — get one free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- `OPENAI_API_KEY` — get one at [platform.openai.com](https://platform.openai.com)
- `DATABASE_URL` — a free Postgres instance from [Neon](https://neon.tech) or [Supabase](https://supabase.com) works well

### 3. Run the dev server

```bash
npm run dev
```

Visit **http://localhost:3000**.

### 4. (Optional) Set up the database

Only needed if you want persistent chat history, saved decks, or saved flashcard sets:

```bash
npx prisma migrate dev --name init
npx prisma studio   # optional: browse your data visually
```

---

## 📦 Production build

```bash
npm run build
npm run start
```

`npm run build` runs `prisma generate` first (safe even without a `DATABASE_URL`), then
builds the Next.js app.

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no configuration needed (`vercel.json` is already included).
4. In **Project Settings → Environment Variables**, add the same keys from `.env.local`
   (`GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`
   set to your production URL).
5. Deploy. Every subsequent `git push` to your default branch redeploys automatically.

If you don't have a Postgres database yet, the site still deploys and works fully for every
client-side tool and any AI feature you've added keys for — the `DATABASE_URL` is only needed
for persistence.

---

## 🐙 Pushing to GitHub

From inside this project folder:

```bash
git init
git add .
git commit -m "Initial commit: Veloce Workspace"
git branch -M main
git remote add origin https://github.com/<your-username>/veloce-workspace.git
git push -u origin main
```

`.env.local` is already excluded via `.gitignore`, so your API keys will never be committed.

---

## 📁 Project structure

```
veloce-workspace/
├── app/
│   ├── api/
│   │   ├── chat/{groq,gemini,openai}/route.ts   # Streaming multi-model chat endpoints
│   │   └── presentations/route.ts               # AI deck outline generator
│   ├── tools/
│   │   ├── pdf/page.tsx                         # Merge / split / image→PDF
│   │   ├── calculators/page.tsx                 # GST / tax regime / GPA
│   │   └── qr/page.tsx                          # QR generator + password + age tools
│   ├── flashcards/page.tsx
│   ├── presentations/page.tsx
│   ├── chat/page.tsx
│   ├── layout.tsx, page.tsx, globals.css
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx
├── components/
│   ├── Navbar.tsx, Footer.tsx, Hero.tsx, ParallaxGallery.tsx
│   ├── FeatureSections.tsx, ChatDrawer.tsx
│   ├── pdf/, calculators/, utilities/, flashcards/
├── lib/prisma.ts
├── prisma/schema.prisma
├── .env.example
├── vercel.json
```

---

## 🗺️ Roadmap for extending this project

The original design brief scoped further phases beyond this build — good next steps if you
want to keep growing this for viva/demo purposes:

- Add NextAuth (or Clerk) for real user accounts, wiring the existing Prisma `User` model to sessions
- Move chat history and flashcard sets from `localStorage` into the Prisma database per logged-in user
- Add `mammoth.js` / `xlsx` conversions to the PDF Suite for Word/Excel ↔ PDF
- Swap the CSS-3D parallax gallery for a full `@react-three/fiber` scene if you want true WebGL depth
- Add voice input to the chat drawer via the Web Speech API

---

## ⚠️ Notes

- The tax-regime calculator uses simplified, illustrative slabs for demonstration — not
  professional tax advice.
- This project was scaffolded and built collaboratively with Claude (Anthropic).
