# Upstox Holdings — Folders (Concept Demo)

A frontend-only concept prototype showing what a **Folders** feature inside
Upstox Holdings could look like — group your stocks into custom folders
(e.g. "Long Term", "Banking Stocks", "High Conviction"), see rolled-up P&L
per folder, and keep everything else in a clean "Unassigned" bucket.

> ⚠️ **Not affiliated with or endorsed by Upstox.** This is an unofficial
> concept demo built to pitch a feature idea — mock data only, no real
> account, login, or trading functionality.

**Live demo:** [upstox-holding-list-folder.vercel.app](https://upstox-holding-list-folder.vercel.app)

---

## What it does

- **Home → Holdings navigation** with a bottom tab bar and index ticker,
  styled to match Upstox's real light-theme UI
- **Create, edit, and delete folders** — name, color, and icon
- **Assign stocks to folders** via a "⋮" menu on each holding, or by
  dragging a stock directly onto a folder card
- **Per-folder rollups** — invested value, current value, and overall P&L
  computed live from the stocks inside it
- **Unassigned bucket** — a dedicated view for stocks not yet sorted into
  any folder
- Polished for screen recording: subtle animations, toast confirmations,
  and an on-screen iPhone mockup when viewed on a desktop browser

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- Plain `useReducer` + Context for state — no external state library
- No backend — everything runs in memory, with folder/assignment state
  persisted to `localStorage` so a refresh doesn't reset your demo setup

## Getting started

```bash
cd app
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Other useful commands, run from inside `app/`:

```bash
npm run build    # production build, output to app/dist
npm run preview  # serve the production build locally
npm run lint      # oxlint
```

## Project structure

```
.
├── app/                  # the Vite + React application
│   ├── src/
│   │   ├── components/   # UI building blocks (rows, modals, icons, chips…)
│   │   ├── screens/      # HomeScreen, HoldingsScreen
│   │   ├── context/      # holdings/folders state + toast notifications
│   │   ├── data/         # mock holdings data, folder color/icon palette
│   │   └── utils/        # number/currency formatting helpers
│   └── package.json
├── docs/
│   ├── ProblemStatement.md         # the original feature brief
│   ├── PhasewiseArchitecture.md    # how the build was sequenced
│   └── EdgeCases.md                # behaviors deliberately handled
└── vercel.json           # deploy config (builds from app/, see below)
```

See [`docs/`](docs/) for the full problem statement, the phase-by-phase
build plan, and the edge cases this prototype handles on purpose.

## Deployment

This repo deploys to [Vercel](https://vercel.com) as a static site. The
root-level [`vercel.json`](vercel.json) tells Vercel to build from the
`app/` subfolder automatically:

```json
{
  "buildCommand": "cd app && npm install && npm run build",
  "outputDirectory": "app/dist"
}
```

Import this repo in Vercel and deploy — no extra configuration needed.

## Non-goals

- No real authentication, Upstox account connection, or live market data
- No backend, database, or persistence beyond the browser's `localStorage`
- No order placement, trading, or transaction features

This is a UI/UX concept only.
