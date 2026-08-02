# Excuse Me — Agent Guide

A playful excuse generator styled as an official service of the **Department of No**. Users pick a category and tone, optionally add context, and receive one short, copyable excuse.

**Repo:** [https://github.com/CHPeake/ExcuseMe](https://github.com/CHPeake/ExcuseMe)

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, custom bureaucratic design tokens in `app/globals.css` |
| Fonts | Source Serif 4 (display), Source Sans 3 (body), IBM Plex Mono (metadata) |
| Validation | Zod |
| AI | OpenAI API (`openai` SDK), model in `lib/ai/config.ts` |
| Motion | Motion (`motion/react`) |
| Icons | Lucide React |
| Tests | Vitest |
| Hosting | Vercel-compatible; no database |

## Commands

```bash
npm install          # install dependencies
cp .env.example .env.local
npm run dev          # localhost:3000
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm test             # vitest run
npm run build        # production build
npm start            # serve production build
```

## Project layout

```
app/
  actions/generate-excuse.ts   # Server Action entry point
  components/                  # Client UI (form, result, loading, header, footer)
  privacy/page.tsx
  opengraph-image.tsx
  robots.ts
  sitemap.ts
  layout.tsx
  page.tsx                     # force-dynamic; decorative reference number
lib/
  ai/
    config.ts                  # model, tokens, temperature, timeout
    prompt.ts                  # system prompt + tone guidance
    generate.ts                # OpenAI call + fallback orchestration
    validate-output.ts         # word limit, leaks, prohibited themes
  fallback-excuses.ts          # local library by category × tone
  schemas.ts                   # Zod request schema
  constants.ts                 # categories, tones, loading copy, labels
  types.ts
  utils.ts
public/
  favicon.svg
  icon.svg
  social-card.png
```

Path alias: `@/*` → project root.

## Architecture

### Request flow

1. Client form (`ExcuseForm`) collects `category`, `tone`, optional `context`.
2. `generateExcuseAction` validates with Zod (`lib/schemas.ts`).
3. `generateExcuse` (`lib/ai/generate.ts`) calls OpenAI with the constrained prompt.
4. Output is validated (`validateExcuseOutput`). On any failure (missing key, timeout, invalid output), a fallback excuse is returned.
5. UI shows an approval-style result with copy / try another / share / start over.

There is no auth, database, or dashboard. All state is local React state in the form component.

### AI rules

- Keep the API key server-side only (`OPENAI_API_KEY`).
- Change the model in **one place**: `lib/ai/config.ts`.
- Never trust client enums/strings without Zod.
- Keep excuses ≤ 65 words, usable as a sendable message.
- Safety: block death, serious illness, crime, fraud, panic-inducing scenarios, etc. (prompt + output filters).
- Do not surface raw technical errors to users when a fallback can be shown.

### UI conventions

- Formal bureaucratic document aesthetic: paper background, fine borders, burgundy accent, monospace metadata.
- Playfulness comes from copy, not cartoon illustration or neon/glow trends.
- Prefer selectable option cards over native `<select>` where practical.
- Client Components only where interactivity is required (`excuse-form`, `excuse-result`, `loading-state`, `option-card`).
- Respect `prefers-reduced-motion`.
- `suppressHydrationWarning` is on `<html>` / `<body>` for browser-extension attribute noise.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | For live AI | Server-side OpenAI requests |
| `NEXT_PUBLIC_SITE_URL` | Recommended in prod | Canonical URL, sitemap, robots, metadataBase |

Never commit `.env.local` or real API keys. `.env*` is gitignored.

## Dependency overrides

`package.json` overrides pin `postcss` and `sharp` to patched versions. Do not run `npm audit fix --force` — it proposes a destructive Next.js downgrade.

## Code style

- Small, focused diffs; match existing patterns.
- Shared types in `lib/types.ts`; enums/options in `lib/constants.ts`.
- Conventional commits: `feat:`, `fix:`, `refactor:`, etc. (lowercase, imperative, no trailing period).
- Only commit when explicitly asked.
- Prefer Vitest tests for validation, fallback, and AI edge cases over heavy UI tests.

## Common tasks

| Task | Where to work |
|---|---|
| Change categories/tones | `lib/constants.ts`, `lib/schemas.ts`, `lib/types.ts`, fallbacks |
| Adjust AI model/params | `lib/ai/config.ts` |
| Change prompt / tone guidance | `lib/ai/prompt.ts` |
| Tighten output safety | `lib/ai/validate-output.ts` |
| Expand fallbacks | `lib/fallback-excuses.ts` |
| Form / result UX | `app/components/*` |
| Design tokens | `app/globals.css`, `app/layout.tsx` fonts |
| Privacy copy | `app/privacy/page.tsx` |
| SEO / social | `app/layout.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, `app/sitemap.ts` |

## Pitfalls

- Home page is `force-dynamic` so the decorative reference number is not frozen at build time.
- Missing `OPENAI_API_KEY` is expected locally; fallbacks must still produce a good UX.
- Hydration warnings mentioning `data-scribe-*` (or similar) usually come from browser extensions, not app code.
- Do not add auth, analytics cookies, or a database unless explicitly requested.
