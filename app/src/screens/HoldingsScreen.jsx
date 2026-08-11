import { useState } from "react";
import { useHoldingsDispatch, useHoldingsState } from "../context/HoldingsContext";
import { useToast } from "../context/ToastContext";
import { computeHoldingMetrics, formatNumber, formatPct } from "../utils/format";
import AppHeader from "../components/AppHeader";
import TopTicker from "../components/TopTicker";
import HoldingRow from "../components/HoldingRow";
import FolderRail from "../components/FolderRail";
import FolderCard from "../components/FolderCard";
import FolderModal from "../components/FolderModal";
import FolderSummaryCard from "../components/FolderSummaryCard";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import AddToFolderSheet from "../components/AddToFolderSheet";
import { CheckCircleIcon, FolderGlyphIcon, TrendDownIcon } from "../components/icons";

const HIGHLIGHT_DURATION_MS = 900;

function usePortfolioTotals(holdings) {
  return holdings.reduce(
    (acc, holding) => {
      const { invested, current } = computeHoldingMetrics(holding);
      acc.invested += invested;
      acc.current += current;
      return acc;
    },
    { invested: 0, current: 0 }
  );
}

function getVisibleHoldings(holdings, activeView) {
  if (activeView.type === "unassigned") {
    return holdings.filter((h) => h.folderIds.length === 0);
  }
  if (activeView.type === "folder") {
    return holdings.filter((h) => h.folderIds.includes(activeView.folderId));
  }
  return holdings;
}

export default function HoldingsScreen() {
  const { holdings, folders, activeView } = useHoldingsState();
  const dispatch = useHoldingsDispatch();
  const { pushToast } = useToast();

  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [menuHoldingId, setMenuHoldingId] = useState(null);
  const [draggingHoldingId, setDraggingHoldingId] = useState(null);
  const [highlightedHoldingId, setHighlightedHoldingId] = useState(null);

  const { invested, current } = usePortfolioTotals(holdings);
  const pnl = current - invested;
  const pnlPct = invested === 0 ? 0 : (pnl / invested) * 100;
  const isUp = pnl >= 0;
  const totalDayChange = holdings.reduce(
    (sum, h) => sum + (h.ltp - h.ltp / (1 + h.dayChangePct / 100)) * h.qty,
    0
  );
  const prevDayValue = current - totalDayChange;
  const totalDayChangePct = prevDayValue === 0 ? 0 : (totalDayChange / prevDayValue) * 100;
  const isDayUp = totalDayChange >= 0;

  const activeFolder =
    activeView.type === "folder" ? folders.find((f) => f.id === activeView.folderId) : null;
  const visibleHoldings = getVisibleHoldings(holdings, activeView);
  const unassignedHoldings = holdings.filter((h) => h.folderIds.length === 0);

  function flashHolding(holdingId) {
    setHighlightedHoldingId(holdingId);
    setTimeout(() => setHighlightedHoldingId((id) => (id === holdingId ? null : id)), HIGHLIGHT_DURATION_MS);
  }

  function handleSaveFolder(payload) {
    if (modalMode === "edit" && activeFolder) {
      dispatch({ type: "UPDATE_FOLDER", payload: { id: activeFolder.id, ...payload } });
      pushToast(`"${payload.name}" updated`);
    } else {
      dispatch({ type: "CREATE_FOLDER", payload });
      pushToast(`"${payload.name}" created`);
    }
    setModalMode(null);
  }

  function handleDeleteFolder() {
    if (!activeFolder) return;
    setPendingDeleteId(activeFolder.id);
    setModalMode(null);
  }

  const folderPendingDelete = folders.find((f) => f.id === pendingDeleteId);
  const pendingDeleteCount = folderPendingDelete
    ? holdings.filter((h) => h.folderIds.includes(folderPendingDelete.id)).length
    : 0;

  function confirmDelete() {
    const name = folderPendingDelete?.name;
    dispatch({ type: "DELETE_FOLDER", payload: { id: pendingDeleteId } });
    setPendingDeleteId(null);
    if (name) pushToast(`"${name}" deleted`);
  }

  const menuHolding = holdings.find((h) => h.id === menuHoldingId) ?? null;

  function handleToggleFolder(folderId) {
    if (!menuHolding) return;
    const folder = folders.find((f) => f.id === folderId);
    const alreadyIn = menuHolding.folderIds.includes(folderId);
    dispatch({
      type: alreadyIn ? "UNASSIGN_FROM_FOLDER" : "ASSIGN_TO_FOLDER",
      payload: { holdingId: menuHolding.id, folderId },
    });
    if (folder) pushToast(alreadyIn ? `Removed from ${folder.name}` : `Added to ${folder.name}`);
    flashHolding(menuHolding.id);
  }

  function handleDropHolding(folderId, holdingId) {
    const holding = holdings.find((h) => h.id === holdingId);
    const folder = folders.find((f) => f.id === folderId);
    if (!holding || !folder || holding.folderIds.includes(folderId)) return;
    dispatch({ type: "ASSIGN_TO_FOLDER", payload: { holdingId, folderId } });
    pushToast(`Added to ${folder.name}`);
    flashHolding(holdingId);
  }

  return (
    <div>
      <TopTicker />
      <AppHeader
        placeholder="Search holdings"
        onBellClick={() => pushToast("No notifications in this demo")}
        onWalletClick={() => pushToast("Account — demo only")}
      />

      <div className="flex items-center gap-5 border-b border-border bg-surface px-4 pt-3">
        <button className="border-b-2 border-fg pb-2.5 text-xs font-semibold text-fg">
          Stocks ({holdings.length})
        </button>
        <button
          onClick={() => pushToast("Mutual Funds — demo only")}
          className="pb-2.5 text-xs font-medium text-muted"
        >
          Mutual Funds
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <div>
          <p className="text-[11px] text-muted">Invested</p>
          <p className="mt-0.5 text-base font-semibold text-fg">{formatNumber(invested)}</p>
          <p className="mt-2 text-[11px] text-muted">Total returns</p>
          <p className={`mt-0.5 text-xs font-semibold ${isUp ? "text-up" : "text-down"}`}>
            {isUp ? "+" : ""}
            {formatNumber(pnl)} ({formatPct(pnlPct)})
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted">Current</p>
          <p className="mt-0.5 text-base font-semibold text-fg">{formatNumber(current)}</p>
          <p className="mt-2 text-[11px] text-muted">Today's returns</p>
          <p className={`mt-0.5 text-xs font-semibold ${isDayUp ? "text-up" : "text-down"}`}>
            {isDayUp ? "+" : ""}
            {formatNumber(totalDayChange)} ({formatPct(totalDayChangePct)})
          </p>
        </div>
      </div>

      <FolderRail
        holdings={holdings}
        activeView={activeView}
        onSelectView={(view) => dispatch({ type: "SET_VIEW", payload: { view } })}
        onCreateClick={() => setModalMode("create")}
      />

      {activeFolder && (
        <FolderSummaryCard folder={activeFolder} holdings={visibleHoldings} onEdit={() => setModalMode("edit")} />
      )}

      <div className="pb-6">
        {activeView.type === "all" ? (
          holdings.length === 0 ? (
            <EmptyState Icon={TrendDownIcon} title="No holdings" />
          ) : (
            <>
              {folders.length > 0 && (
                <>
                  <p className="px-4 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Folders
                  </p>
                  {folders.map((folder) => (
                    <FolderCard
                      key={folder.id}
                      folder={folder}
                      holdings={holdings.filter((h) => h.folderIds.includes(folder.id))}
                      onClick={() =>
                        dispatch({ type: "SET_VIEW", payload: { view: { type: "folder", folderId: folder.id } } })
                      }
                      onDropHolding={handleDropHolding}
                    />
                  ))}
                </>
              )}

              <p className="px-4 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Unassigned
              </p>
              {unassignedHoldings.length === 0 ? (
                <EmptyState
                  Icon={CheckCircleIcon}
                  title="Nothing here — all your holdings are sorted!"
                  subtitle="Every stock has been added to a folder."
                />
              ) : (
                unassignedHoldings.map((holding) => (
                  <HoldingRow
                    key={holding.id}
                    holding={holding}
                    onOpenMenu={(h) => setMenuHoldingId(h.id)}
                    isDragging={draggingHoldingId === holding.id}
                    isHighlighted={highlightedHoldingId === holding.id}
                    onDragStart={setDraggingHoldingId}
                    onDragEnd={() => setDraggingHoldingId(null)}
                  />
                ))
              )}
            </>
          )
        ) : visibleHoldings.length === 0 ? (
          activeView.type === "unassigned" ? (
            <EmptyState
              Icon={CheckCircleIcon}
              title="Nothing here — all your holdings are sorted!"
              subtitle="Every stock has been added to a folder."
            />
          ) : (
            <EmptyState
              Icon={FolderGlyphIcon}
              title="No stocks yet"
              subtitle="Add stocks to this folder from a holding's overflow menu."
            />
          )
        ) : (
          visibleHoldings.map((holding) => (
            <HoldingRow
              key={holding.id}
              holding={holding}
              onOpenMenu={(h) => setMenuHoldingId(h.id)}
              isDragging={draggingHoldingId === holding.id}
              isHighlighted={highlightedHoldingId === holding.id}
              onDragStart={setDraggingHoldingId}
              onDragEnd={() => setDraggingHoldingId(null)}
            />
          ))
        )}
      </div>

      {menuHolding && !modalMode && (
        <AddToFolderSheet
          holding={menuHolding}
          folders={folders}
          onToggleFolder={handleToggleFolder}
          onCreateFolderClick={() => setModalMode("create")}
          onClose={() => setMenuHoldingId(null)}
        />
      )}

      {modalMode && (
        <FolderModal
          folder={modalMode === "edit" ? activeFolder : null}
          onSave={handleSaveFolder}
          onDelete={handleDeleteFolder}
          onClose={() => setModalMode(null)}
        />
      )}

      {folderPendingDelete && (
        <ConfirmDialog
          title={`Delete "${folderPendingDelete.name}"?`}
          message={
            pendingDeleteCount > 0
              ? `${pendingDeleteCount} stock${pendingDeleteCount > 1 ? "s" : ""} will move back to Unassigned. This won't affect your actual holdings.`
              : "This folder has no stocks in it. This action can't be undone."
          }
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
}
