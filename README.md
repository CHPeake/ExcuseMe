# Excuse Me

A quick, playful excuse generator that creates harmless, funny excuses for everyday situations. Styled as an official service of the **Department of No**.

**Professionally generated reasons for absolutely anything.**

## Technology stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Server Actions
- Zod
- OpenAI API
- Motion
- Lucide icons
- Vitest

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example and add your key:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```env
OPENAI_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never commit a real API key. `.env*` files are gitignored.

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | For live AI generation | Server-side OpenAI requests |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Canonical URL, sitemap, and robots |

## How AI generation works

1. The client submits category, tone, and optional context through a Server Action.
2. Inputs are validated with Zod on the server.
3. A constrained system prompt is sent to OpenAI using the model configured in `lib/ai/config.ts`.
4. The response is validated for length, leakage, and prohibited themes.
5. A short excuse is returned to the UI.

The API key is never exposed to the browser.

## How fallback generation works

If the OpenAI request fails, times out, the key is missing, or the output fails validation, the app selects a local fallback excuse from `lib/fallback-excuses.ts`.

Fallbacks are organised by category and tone. Users may see a quiet notice:

> Generated using emergency departmental procedures.

Technical errors are logged on the server.

## Safety constraints

Generated excuses must stay short, coherent, and harmless. The prompt and output validation block alarming or harmful scenarios such as death, serious illness, crime, fraud, or anything likely to cause panic. Sensitive user context is replaced with a vague personal scheduling conflict.

## Project structure

```text
app/
├── actions/generate-excuse.ts
├── components/
├── privacy/page.tsx
├── globals.css
├── layout.tsx
├── page.tsx
├── robots.ts
└── sitemap.ts

lib/
├── ai/
├── fallback-excuses.ts
├── schemas.ts
├── constants.ts
├── types.ts
└── utils.ts
```

## Commands

```bash
npm run dev       # local development
npm run lint      # eslint
npm run typecheck # TypeScript
npm test          # vitest
npm run build     # production build
npm start         # serve production build
```

## Deploying on Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add `OPENAI_API_KEY` in the project environment variables.
4. Optionally set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.

The app is designed for the Vercel Node runtime and needs no database.

## Analytics

No tracking is enabled by default. Vercel Analytics can be added later without changing the core product flow.
