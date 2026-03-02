# AGENTS.md

## Cursor Cloud specific instructions

This is a static Next.js 16 site (React 19, TypeScript) with no backend, database, or external APIs. All member data is hardcoded in `src/data/members.ts`.

### Running the app

- `npm run dev` starts the dev server on port 3000.
- `npm run build` produces a production build.
- `npm run lint` runs ESLint. Pre-existing lint errors exist in `NetworkGraph.tsx` and `ThemeContext.tsx`; these are not regressions.

### Project structure

- `src/components/MembersTable.tsx` — members table (name, program, links columns)
- `src/components/NetworkGraph.tsx` — interactive constellation/network graph
- `src/components/SearchableContent.tsx` — search, filters, and layout orchestration
- `src/data/members.ts` — member data and helpers
- `src/app/globals.css` — all styles (no CSS modules)

### Notes

- No `.env` or secrets are needed.
- The `package-lock.json` lockfile is present; use `npm install` (not pnpm/yarn).
- `public/watermark.png` is referenced by `AsciiBackground.tsx` but may not exist in the repo; this is a known cosmetic gap.
