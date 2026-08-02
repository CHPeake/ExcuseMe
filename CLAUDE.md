# Excuse Me — Claude Code Guide

This file orients Claude Code (and similar assistants) when working in this repository. For full project context, see [AGENTS.md](./AGENTS.md).

## What this app does

**Excuse Me** generates short, funny, harmless excuses for everyday avoidance. The UI pretends to be an official form from the **Department of No**. Users choose:

1. What they are avoiding (category)
2. How it should sound (tone)
3. Optional context

The server returns one excuse that can be copied, shared, regenerated, or reset. No accounts, no database, no dashboard.

## Quick start

```bash
cp .env.example .env.local   # add OPENAI_API_KEY for live AI
npm install
npm run dev
```

Without `OPENAI_API_KEY`, generation still works via local fallbacks.

## Where to look first

| Concern | Primary files |
|---|---|
| Form UX / UI state | `app/components/excuse-form.tsx` |
| Result actions | `app/components/excuse-result.tsx` |
| Server Action | `app/actions/generate-excuse.ts` |
| AI orchestration | `lib/ai/generate.ts` |
| Prompt + tone guidance | `lib/ai/prompt.ts` |
| Model config | `lib/ai/config.ts` |
| Output safety | `lib/ai/validate-output.ts` |
| Fallbacks | `lib/fallback-excuses.ts` |
| Zod schema | `lib/schemas.ts` |
| Categories / tones / copy | `lib/constants.ts` |
| Design tokens | `app/globals.css` |
| Privacy | `app/privacy/page.tsx` |

## Rules for changes

1. **Server-side AI only** — never expose `OPENAI_API_KEY` to the client.
2. **Validate everything** — Zod on the server; do not trust client enums or context.
3. **Keep excuses safe and short** — ≤ 65 words; no harmful/alarming scenarios.
4. **Fallback on failure** — missing key, timeout, invalid model output → local excuse, not a scary error.
5. **Preserve the bureaucratic aesthetic** — paper, fine borders, burgundy accent, playful copy; avoid generic AI gradients, neon, emoji clutter, chatbot UIs.
6. **Client Components only where needed** — interactivity in form/result/loading/option cards; keep the rest as Server Components.
7. **Small diffs** — match existing naming, `@/` imports, and file placement.
8. **Test logic, not chrome** — prefer Vitest coverage for schemas, validation, fallbacks, and AI edge cases.

## Generation pipeline (mental model)

```
ExcuseForm → generateExcuseAction (Zod)
  → generateExcuse (OpenAI)
  → validateExcuseOutput
  → result OR getFallbackExcuse()
```

## Stack reference

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4
- Zod + OpenAI + Motion + Lucide
- Vitest
- Vercel-ready; no DB

## Commits

Use conventional commits when asked to commit: `feat: add …`, `fix: resolve …`, etc.

## Do not

- Commit `.env.local` or API keys
- Run `npm audit fix --force` (it proposes a breaking Next.js downgrade)
- Add auth, cookies/consent banners, or a database unless requested
- Weaken safety filters in `lib/ai/prompt.ts` / `validate-output.ts`
- Replace the formal Department of No visual language with a generic AI look
