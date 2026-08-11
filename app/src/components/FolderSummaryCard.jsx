import { computeHoldingMetrics, formatNumber, formatPct } from "../utils/format";
import FolderIcon from "./FolderIcon";

export default function FolderSummaryCard({ folder, holdings, onEdit }) {
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

  const totalDayChange = holdings.reduce(
    (sum, h) => sum + (h.ltp - h.ltp / (1 + h.dayChangePct / 100)) * h.qty,
    0
  );
  const isDayUp = totalDayChange >= 0;

  return (
    <div className="shrink-0 border-b border-border bg-surface px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${folder.color}22`, color: folder.color }}
          >
            <FolderIcon id={folder.icon} size={18} />
          </span>
          <span className="text-sm font-semibold text-fg">{folder.name}</span>
          <span className="text-xs text-muted">· {holdings.length} stocks</span>
        </div>
        <button onClick={onEdit} className="text-xs font-medium text-accent-2">
          Edit
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Invested</p>
          <p className="mt-0.5 text-sm font-semibold text-fg">{formatNumber(totals.invested)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Current</p>
          <p className="mt-0.5 text-sm font-semibold text-fg">{formatNumber(totals.current)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Overall returns</p>
          <p className={`mt-0.5 text-sm font-semibold ${isUp ? "text-up" : "text-down"}`}>
            {isUp ? "+" : ""}
            {formatNumber(pnl)} ({formatPct(pnlPct)})
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Today's returns</p>
          <p className={`mt-0.5 text-sm font-semibold ${isDayUp ? "text-up" : "text-down"}`}>
            {isDayUp ? "+" : ""}
            {formatNumber(totalDayChange)}
          </p>
        </div>
      </div>
    </div>
  );
}
