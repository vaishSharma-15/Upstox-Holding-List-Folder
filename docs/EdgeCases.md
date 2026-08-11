# Edge Cases: Folders in Upstox Holdings (Prototype)

Companion to [ProblemStatement.md](./ProblemStatement.md) and
[PhasewiseArchitecture.md](./PhasewiseArchitecture.md). Since the deliverable
is a *recorded* demo, undefined behavior here means an on-camera glitch that
can't be edited out — every one of these should have a decided, implemented
behavior before recording.

## Folder Creation & Editing

- **Empty/whitespace-only folder name** → disable "Create" button; show
  inline validation, don't allow silent no-op folders.
- **Duplicate folder name** (e.g. two folders both named "Long Term") →
  allowed (folders are identified by id, not name), but consider a subtle
  warning so it's clearly intentional on camera.
- **Very long folder name** (30+ chars) → enforce a max length (e.g. 24
  chars) with truncation + ellipsis in the chip UI so layout doesn't break.
- **No color/icon selected** → default to a sensible fallback (e.g. next
  color in a rotation) rather than leaving it unset/blank.
- **Creating a folder while a filtered view is active** → new folder should
  not auto-switch the view; user stays where they are, sees the new chip
  appear in `FolderRail`.
- **Renaming a folder currently being viewed** → `FolderSummaryCard` title
  and `FolderRail` chip must update in the same render, no stale name.

## Folder Deletion

- **Delete a folder that has assigned stocks** → confirm dialog required;
  on confirm, those stocks' `folderIds` lose this folder's id and fall back
  to Unassigned (or their other folders, if multi-assigned) — never
  silently delete the holdings themselves.
- **Delete the folder currently being viewed** → `activeView` must reset to
  `"all"` immediately after deletion, not point at a dangling folder id
  (would otherwise render a blank/crashed view).
- **Delete last remaining folder** → `FolderRail` gracefully returns to
  showing just "All" / "Unassigned" / "+ New Folder", no layout collapse.
- **Accidental double-delete / rapid double-click** → guard against firing
  the delete action twice (disable button after first confirm click).

## Assignment (menu + drag-and-drop)

- **Assign a stock that's already in the target folder** → no-op / show as
  already-checked in `AddToFolderSheet`, don't create duplicate ids in
  `folderIds`.
- **Assign a stock to multiple folders** → explicitly supported per data
  model; `HoldingRow` should show a subtle multi-folder indicator (e.g.
  small count badge) rather than only showing the last-assigned folder.
- **Drag a stock and drop it outside any valid drop target** → row snaps
  back to original position, no state change, no error.
- **Drag-and-drop on touch/mobile-emulated viewport** → since the demo
  targets a narrow mobile-style layout, verify drag works with touch events
  or provide the ⋮-menu path as the reliable fallback for recording.
- **Unassign a stock from a folder while viewing that folder** → the row
  should animate/filter out of the current view immediately (list re-derives
  from `folderIds`, no manual removal needed) and the summary card totals
  update in the same tick.
- **Removing the last stock from a folder via unassign** → folder itself is
  NOT deleted (folders persist even when empty) — only explicit delete
  removes a folder.

## Views (All / Unassigned / Folder)

- **Unassigned view when every stock has at least one folder** → show a
  clear empty state ("Nothing here — all your holdings are sorted!"), not a
  blank white/dark screen.
- **Folder view for a folder with zero assigned stocks** → empty state
  specific to folders ("No stocks yet — add some from the menu"), summary
  card shows ₹0 / 0% rather than `NaN` or `undefined`.
- **Switching views rapidly** (clicking All → Folder A → Folder B fast) →
  no flicker of stale data; ensure derived list recomputes synchronously
  from state, not from a stale memo/cache.
- **All view stock count vs. sum of folder counts** → a stock in 2 folders
  should count once in "All" but appear in both folders' views — verify the
  rollup math doesn't double-count portfolio totals anywhere.

## Data / Numbers

- **Negative P&L formatting** → red color + minus sign, no double-negative
  or missing sign; percentage and absolute value must agree in sign.
- **Zero quantity or zero avg price** (shouldn't occur in mock data, but
  guard anyway) → avoid divide-by-zero producing `NaN%` or `Infinity` in P&L
  calc; either exclude such rows from mock data or clamp the calc.
- **Very large numbers** (e.g. a mock holding worth ₹10,00,000+) → confirm
  Indian numbering format (lakh/crore, comma placement) is used consistently
  everywhere, matching Upstox's actual formatting, not `1,000,000` US-style.
- **Folder summary rollup precision** → rounding should match what's shown
  per-row (sum of rounded values can visibly differ from rounded sum of
  exact values by a paisa/rupee — pick one approach and apply consistently).

## Theme & Layout

- **Long stock/company names** (e.g. "Tata Consultancy Services") in a
  narrow mobile-width row → truncate with ellipsis, never wrap and break row
  height/alignment.
- **Theme toggle mid-interaction** (e.g. toggling while a modal is open) →
  modal and all open overlays must re-theme instantly, no mismatched
  light-modal-on-dark-background flash.
- **Many folders created** (10+, stress test) → `FolderRail` should scroll
  horizontally cleanly, not wrap awkwardly or overflow the viewport.
- **Refresh mid-demo** (if using `localStorage` persistence) → state
  restores exactly as left; if persistence is intentionally skipped, verify
  a refresh cleanly resets to the seeded mock state rather than a blank/error
  screen.

## Out-of-Scope Reminders (should fail gracefully, not silently break)

- No backend — if any code path assumes an async API call, it should be
  mocked/stubbed, never left as a real `fetch` that fails silently.
- No auth — no login-gated route should exist that could dead-end the demo
  recording.
- No real-time price updates — day-change/P&L values are static per mock
  data; don't build a ticker/interval that could desync numbers on camera.
