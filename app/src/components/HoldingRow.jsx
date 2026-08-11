import { computeHoldingMetrics, formatNumber, formatQty, formatPct } from "../utils/format";
import { FolderGlyphIcon, MoreVerticalIcon } from "./icons";

export const HOLDING_DRAG_TYPE = "application/x-holding-id";

export default function HoldingRow({
  holding,
  onOpenMenu,
  isDragging,
  isHighlighted,
  onDragStart,
  onDragEnd,
}) {
  const { invested, pnl, pnlPct } = computeHoldingMetrics(holding);
  const isUp = pnl >= 0;
  const isDayUp = holding.dayChangePct >= 0;
  const folderCount = holding.folderIds.length;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(HOLDING_DRAG_TYPE, holding.id);
        e.dataTransfer.effectAllowed = "copy";
        onDragStart?.(holding.id);
      }}
      onDragEnd={() => onDragEnd?.()}
      className={`cursor-grab border-b border-border px-4 py-4 transition-[opacity,background-color] duration-300 active:cursor-grabbing ${
        isDragging ? "opacity-40" : "opacity-100"
      } ${isHighlighted ? "bg-accent/10" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-base font-semibold text-fg">{holding.symbol}</span>
          {folderCount > 0 && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent-2">
              <FolderGlyphIcon size={11} active />
              {folderCount > 1 ? `×${folderCount}` : ""}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className={`text-base font-semibold ${isUp ? "text-up" : "text-down"}`}>
            {isUp ? "+" : ""}
            {formatNumber(pnl)} ({formatPct(pnlPct)})
          </span>
          <button onClick={() => onOpenMenu?.(holding)} aria-label="More options" className="text-muted">
            <MoreVerticalIcon size={18} />
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-muted">
        <span>Invested {formatNumber(invested)}</span>
        <span>{formatNumber(holding.avgPrice)} Avg.</span>
      </div>

      <div className="mt-1 flex items-center justify-between text-sm text-muted">
        <span>Qty. {formatQty(holding.qty)}</span>
        <span>
          {formatNumber(holding.ltp)}{" "}
          <span className={isDayUp ? "text-up" : "text-down"}>({formatPct(holding.dayChangePct)})</span> LTP
        </span>
      </div>
    </div>
  );
}
