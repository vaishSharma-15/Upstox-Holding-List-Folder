# Phasewise Architecture: Folders in Upstox Holdings (Prototype)

Companion to [ProblemStatement.md](./ProblemStatement.md). This breaks the
build into shippable phases, each ending in something demo-able, plus the
data/component design that stays stable across phases.

## Tech Stack

- **React** (Vite) + **Tailwind CSS** — fast iteration, easy to match Upstox's
  utility-driven look.
- **In-memory state only** — React Context + `useReducer`, optionally
  persisted to `localStorage` so a refresh mid-recording doesn't wipe state.
- No routing library needed; view switching (All / Folder / Unassigned) is
  local component state.
- **dnd-kit** (or plain HTML5 drag events if dnd-kit is overkill) for
  drag-and-drop assignment.
- **Framer Motion** (optional, Phase 4) for transition polish on camera.

## Data Model

```ts
type Holding = {
  id: string;
  symbol: string;          // "TCS"
  name: string;             // "Tata Consultancy Services"
  sector: string;            // "IT"
  qty: number;
  avgPrice: number;
  ltp: number;               // last traded / current price
  dayChangePct: number;
  folderIds: string[];       // empty array = Unassigned
};

type Folder = {
  id: string;
  name: string;
  color: string;              // hex or Tailwind token
  icon: string;                // icon key
  createdAt: number;
};

type AppState = {
  holdings: Holding[];
  folders: Folder[];
  activeView: { type: "all" } | { type: "unassigned" } | { type: "folder"; folderId: string };
  theme: "dark" | "light";
};
```

Derived values (invested amount, current value, P&L, folder rollups) are
**computed selectors**, never stored — avoids sync bugs between raw holdings
and cached totals.

## Component Map (stable across phases)

```
App
├── ThemeProvider
├── HoldingsProvider (Context: state + dispatch)
├── TopBar (theme toggle, total portfolio summary)
├── FolderRail (horizontal scroll: "All" | "Unassigned" | folder chips | "+ New Folder")
├── HoldingsList
│   └── HoldingRow (symbol, qty, avg, ltp, P&L, day change, ⋮ menu)
├── FolderSummaryCard (shown when activeView.type === "folder")
├── NewFolderModal / EditFolderModal
├── AddToFolderSheet (bottom sheet, opened from ⋮ menu)
└── EmptyState (Unassigned-is-empty, Folder-is-empty variants)
```

---

## Phase 0 — Setup & Mock Data

**Goal:** project scaffold + realistic data, nothing interactive yet.

- Scaffold Vite + React + Tailwind.
- Configure Tailwind theme tokens to match Upstox: purple/violet accent
  (`#5B2E91`-ish), dark background (`#0F0F13`-ish), card surfaces, font stack
  (system sans, e.g. Inter).
- Write `mockHoldings.ts`: 15–20 stocks spread across IT, banking, FMCG,
  pharma, auto, with plausible qty/avg/ltp so P&L numbers look real (mix of
  green and red).
- No folders yet, no interactivity.

**Demo-able at end of phase:** static screenshot-quality holdings list.

---

## Phase 1 — Baseline Holdings List View

**Goal:** the "current Upstox Holdings screen" recreated.

- `HoldingsList` + `HoldingRow` components, styled to match Upstox spacing,
  color-coded P&L (green/red), day-change badges.
- `TopBar` with aggregate portfolio value, total P&L.
- Fully static — read-only render of mock data via Context (write path not
  needed yet, but wire the Provider now so Phase 2+ doesn't refactor state
  shape).

**Demo-able:** scrollable, correctly-styled holdings screen indistinguishable
from the real app at a glance.

---

## Phase 2 — Folder CRUD (no assignment yet)

**Goal:** folders can be created, renamed, recolored, deleted — independent
of holdings.

- `FolderRail` renders folder chips from state (empty initially).
- `NewFolderModal`: name input (required, trimmed, max length), color swatch
  picker, icon picker, Create/Cancel.
- `EditFolderModal`: same fields pre-filled, Save/Delete.
- Delete flow: confirm dialog → folder removed → any holdings referencing it
  have that `folderId` stripped (falls back toward Unassigned).
- Reducer actions: `CREATE_FOLDER`, `UPDATE_FOLDER`, `DELETE_FOLDER`.

**Demo-able:** create "Long Term", "Banking Stocks", "High Conviction",
rename one, delete one — folder chips update live, no stock assignment yet.

---

## Phase 3 — Assignment & Views

**Goal:** the core value prop — sorting stocks into folders and viewing
rollups.

- `⋮` menu on `HoldingRow` → `AddToFolderSheet` (checklist of folders,
  multi-select, "+ New Folder" inline shortcut).
- Drag-and-drop: drag a `HoldingRow` onto a `FolderRail` chip to assign
  (visual drop-target highlight).
- `activeView` switching: clicking a folder chip filters `HoldingsList` to
  that folder + shows `FolderSummaryCard` (invested, current value, P&L %,
  count).
- "Unassigned" view/bucket: holdings with `folderIds.length === 0`.
- "All" view: unfiltered, default on load.
- Reducer actions: `ASSIGN_TO_FOLDER`, `UNASSIGN_FROM_FOLDER`.

**Demo-able:** the full user story — assign stocks via menu and drag, click
between All/Unassigned/Folder views, see rollups update correctly. This is
the phase where the feature is functionally complete.

---

## Phase 4 — Polish Pass for Recording

**Goal:** nothing new functionally; make every interaction look good on
camera.

- Micro-animations: folder chip creation pop-in, drag-drop snap, row
  highlight on assignment, modal enter/exit transitions (Framer Motion or
  Tailwind transitions).
- Dark/light theme toggle wired end-to-end (if not already default dark).
- Mobile-narrow viewport lock (e.g. max-width container simulating a phone
  frame) since the recording will emulate the mobile app.
- Toast/snackbar confirmations ("Added to Banking Stocks", "Folder deleted").
- Final pass against [EdgeCases.md](./EdgeCases.md) so nothing breaks
  mid-recording (empty states, long names, zero-holding folders, etc.).
- `localStorage` persistence so a page refresh between takes doesn't lose
  the demo setup.

**Demo-able:** the finished LinkedIn-recording-ready build.

---

## Phase Summary Table

| Phase | Adds | Risk if skipped |
|---|---|---|
| 0 | Scaffold + mock data | Nothing to build on |
| 1 | Baseline list UI | Feature has no visual "home" |
| 2 | Folder CRUD | No folders exist to assign into |
| 3 | Assignment + views | Core feature is absent — this is the demo's point |
| 4 | Polish + edge cases | Demo looks rough or breaks on camera |

Phases 0–3 are functional milestones; Phase 4 is purely about the fact that
the deliverable is a *recorded video*, where visual glitches are far more
visible and unrecoverable than in normal use.
