# AGENTS.md

BookNook client — a Next.js 16 (App Router) frontend for an online library, deployed to Vercel.

## Commands

- Dev: `npm run dev` (Turbopack; the only bundler configured)
- Lint: `npm run lint` (runs `eslint` with flat config in `eslint.config.mjs`)
- Typecheck: `npx tsc --noEmit` (no npm script exists)
- Build: `npm run build`
- No tests, no CI workflows, no formatter config exist — don't invent test steps.

## Stack quirks (verify before assuming defaults)

- **Next 16.4.3 + React 19.3 with the React Compiler enabled** (`reactCompiler: true` in `next.config.ts`). Don't add `useMemo`/`useCallback`/`React.memo` — the compiler handles it.
- `cacheComponents: true` and `partialPrefetching: true` are on. Caching/prefetch semantics differ from older Next; check `node_modules/next/dist/docs/` before writing data-fetching code.
- **Tailwind v4, CSS-first config**: no `tailwind.config`. Theme lives in `src/app/globals.css` under `@theme inline`; plugins (`daisyui`, `tw-animate-css`) are imported there. Edit CSS, not JS config.
- **shadcn/ui uses the `base-nova` style built on Base UI (`@base-ui/react`), not Radix.** Components under `src/components/ui/` import primitives like `@base-ui/react/button`. Don't swap in Radix equivalents.
- `cn` is the standalone `cn` npm package, re-exported from `src/lib/utils.ts` — it is *not* the usual `clsx + tailwind-merge` helper. `import { cn } from "cn"` (or `@/lib/utils`) directly; don't add clsx/tailwind-merge.

## Auth (better-auth)

- Server config: `src/lib/auth.ts` — MongoDB adapter, hardcoded db name `BookNook`, email+password and Google sign-in.
- Client hooks: `src/lib/auth-client.ts` — exports `authClient`, `signIn`, `signUp`, `signOut`, `useSession`, `updateUser`. Client hooks are used in `"use client"` components (Navbar, profile, auth pages).
- Handler route: `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`). Don't create additional auth API routes.
- Required env vars (gitignored `.env`, never commit): `MONGODB_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL` (Express backend base URL, port 5000). `auth-client.ts` reads `BETTER_AUTH_URL` for the base URL.

## Layout

- `@/*` → `./src/*` (tsconfig path alias; components.json uses the same aliases).
- Root layout (`src/app/layout.tsx`) renders Navbar + Footer + `react-hot-toast` `<Toaster />`; pages shouldn't re-add these.
- Route group `(auth)` holds `signin`/`signup` pages; most interactive pages/components are client components (`"use client"`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
