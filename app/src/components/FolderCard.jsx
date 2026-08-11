import { useState } from "react";
import { computeHoldingMetrics, formatNumber, formatPct } from "../utils/format";
import FolderIcon from "./FolderIcon";
import { HOLDING_DRAG_TYPE } from "./HoldingRow";

export default function FolderCard({ folder, holdings, onClick, onDropHolding }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const totals = holdings.reduce(
    (acc, holding) => {
      const { invested, current } = computeHoldingMetrics(holding);
      acc.invested += invested;
      acc.current += current;
      return acc;
    },
    { invested: 0, current: 0 }
  );
  const pnl = totals.current - totals.invested;
  const pnlPct = totals.invested === 0 ? 0 : (pnl / totals.invested) * 100;
  const isUp = pnl >= 0;

  return (
    <button
      onClick={onClick}
      onDragOver={(e) => {
        if (!e.dataTransfer.types.includes(HOLDING_DRAG_TYPE)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const holdingId = e.dataTransfer.getData(HOLDING_DRAG_TYPE);
        if (holdingId) onDropHolding?.(folder.id, holdingId);
      }}
      className={`flex w-full items-center justify-between border-b border-border px-4 py-4 text-left transition-colors ${
        isDragOver ? "bg-tint" : ""
      }`}
    >
      <div className="flex items-center gap-3.5">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${folder.color}22`, color: folder.color }}
        >
          <FolderIcon id={folder.icon} size={22} />
        </span>
        <div>
          <p className="text-sm font-semibold text-fg">{folder.name}</p>
          <p className="mt-0.5 text-xs text-muted">{holdings.length} stocks</p>
        </div>
      </div>

      <div className="text-right">
        {holdings.length > 0 ? (
          <>
            <p className="text-sm font-semibold text-fg">{formatNumber(totals.current)}</p>
            <p className={`mt-0.5 text-xs font-medium ${isUp ? "text-up" : "text-down"}`}>
              {isUp ? "+" : ""}
              {formatNumber(pnl)} ({formatPct(pnlPct)})
            </p>
          </>
        ) : (
          <p className="text-xs text-muted">Empty</p>
        )}
      </div>
    </button>
  );
}
