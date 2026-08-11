# Problem Statement: Folder/Grouping Feature for Upstox Holdings

## Context

Upstox's Holdings tab lists all stocks a user owns as a flat list, sorted only
by default order or basic filters. There is no way to group holdings into
custom folders or categories (e.g. by industry, by investment horizon like
long-term/short-term, or by personal strategy). This is a confirmed gap — an
open, unresolved feature request on the Upstox community forum. Users
currently work around it with separate Watchlists (which don't show P&L) or
by exporting CSVs to Excel.

## Goal

Build a **frontend-only prototype** (React + Tailwind, or plain HTML/CSS/JS)
that demonstrates what a "Folders" feature inside Upstox Holdings could look
like, using realistic sample/mock data. This is a concept demo to record as a
short screen capture and post on LinkedIn, tagging Upstox, to showcase the
idea.

No real Upstox account, login, or API integration is required. Mock holdings
data should be styled to closely resemble Upstox's actual UI (colors, fonts,
layout, iconography) so the demo reads as a native extension of their product
rather than a generic app.

## Success Criteria

- A reviewer unfamiliar with the project can watch the recorded demo and
  understand the folder concept in under 60 seconds.
- The prototype is visually indistinguishable from Upstox at a glance (color,
  type, spacing, iconography).
- Every interaction in the "Core Features" list below is clickable and works
  without console errors, using only mock/in-memory data.
- The demo runs with a single command (`npm run dev`) or by opening a static
  HTML file — no build errors, no external API keys.

## Core Features to Build

1. **Holdings list view (baseline)**
   Recreate a simplified version of the current Upstox Holdings screen: stock
   name, quantity, avg price, current price, P&L (value + %), day change.
   Populate with ~15–20 mock stocks across a few sectors (IT, banking, FMCG,
   pharma, auto).

2. **Create Folder**
   A "+ New Folder" action that lets the user name a folder (e.g. "Long
   Term", "Banking Stocks", "High Conviction") and optionally pick a
   color/icon.

3. **Assign stocks to folders**
   Users can add a stock to one or more folders via a simple menu (three-dot
   menu on each holding → "Add to folder") or drag-and-drop.

4. **Folder view**
   Clicking a folder shows only the stocks inside it, with a rolled-up
   summary (total invested, current value, overall P&L for that folder).

5. **Unassigned/All view**
   A default view showing all holdings regardless of folder, plus an
   "Unassigned" bucket for stocks not yet sorted into any folder.

6. **Edit/delete folders**
   Rename, recolor, or delete a folder without losing the underlying
   holdings (deleting a folder returns its stocks to Unassigned).

## Non-Goals (out of scope for this demo)

- No real authentication or Upstox account connection.
- No live market data — static/mock prices are fine.
- No backend/database persistence — in-memory or local state is sufficient.
- No order placement, trading, or transaction features.
- No multi-user support, sharing, or sync across devices.

## Design Requirements

- Visually match Upstox's app styling as closely as possible: dark/light
  theme toggle if easy, their purple/violet accent color, card-based layout,
  clean sans-serif typography.
- Should feel smooth and demo-friendly — interactions (creating a folder,
  dragging a stock into it, viewing the folder) need to look polished on
  screen recording, since the deliverable is a LinkedIn video.
- Mobile-app-like layout preferred (narrow viewport) since Upstox is
  primarily used on mobile, but a responsive web view is acceptable if
  that's faster to build well.

## Deliverable

A single-file or small React project that runs locally (`npm run dev` or by
opening an HTML file) with the full flow above clickable end-to-end, ready to
screen-record for a LinkedIn post.

## Related Documents

- [Phasewise Architecture](./PhasewiseArchitecture.md) — build sequence,
  component/data design, and what ships in each phase.
- [Edge Cases](./EdgeCases.md) — behaviors to define explicitly so the demo
  doesn't break or look unpolished on camera.
