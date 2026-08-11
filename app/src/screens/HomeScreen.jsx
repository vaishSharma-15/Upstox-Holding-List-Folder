import AppHeader from "../components/AppHeader";
import TopTicker from "../components/TopTicker";
import {
  ChevronRightIcon,
  TargetIcon,
  BarChartIcon,
  PieChartIcon,
  BellIcon,
  DropletIcon,
  MoneyBagIcon,
  CandlestickIcon,
  UmbrellaIcon,
  StarIcon,
  GridIcon,
  BriefcaseIcon,
  LineChartIcon,
  RefreshIcon,
  ZapIcon,
  NewspaperIcon,
  SearchIcon,
  CalendarIcon,
} from "../components/icons";
import { useHoldingsDispatch, useHoldingsState } from "../context/HoldingsContext";
import { useToast } from "../context/ToastContext";
import { computeHoldingMetrics, formatPct } from "../utils/format";

const QUICK_ACTIONS = [
  [TargetIcon, "Options"],
  [BarChartIcon, "Stocks"],
  [PieChartIcon, "MF"],
  [BellIcon, "IPO"],
  [DropletIcon, "Commodity"],
  [MoneyBagIcon, "MTF"],
  [CandlestickIcon, "Futures"],
  [UmbrellaIcon, "Insurance"],
  [StarIcon, "Advisory"],
  [GridIcon, "More"],
];

const SHORTCUTS = [
  [LineChartIcon, "Option Chain"],
  [RefreshIcon, "Chart 360"],
  [ZapIcon, "Scalper"],
  [NewspaperIcon, "News"],
  [SearchIcon, "Screeners"],
  [CalendarIcon, "Events"],
];

const TRENDING_TABS = ["Most Bought", "Trending under ₹500", "Top Gainers"];

export default function HomeScreen() {
  const { holdings } = useHoldingsState();
  const dispatch = useHoldingsDispatch();
  const { pushToast } = useToast();

  const holdingsPnl = holdings.reduce((sum, h) => sum + computeHoldingMetrics(h).pnl, 0);
  const holdingsPnlPct =
    holdings.reduce((sum, h) => sum + computeHoldingMetrics(h).invested, 0) === 0
      ? 0
      : (holdingsPnl / holdings.reduce((sum, h) => sum + computeHoldingMetrics(h).invested, 0)) * 100;
  const isUp = holdingsPnl >= 0;

  const trending = [...holdings].sort((a, b) => b.dayChangePct - a.dayChangePct).slice(0, 3);

  function goToHoldings() {
    dispatch({ type: "SET_SCREEN", payload: { screen: "holdings" } });
  }

  return (
    <div>
      <TopTicker />
      <AppHeader
        placeholder="Search for a scrip"
        showPlus
        onPlusClick={() => pushToast("Upstox Plus — demo only")}
        onBellClick={() => pushToast("No notifications in this demo")}
        onWalletClick={() => pushToast("Account — demo only")}
      />

      <div>
        <div className="grid grid-cols-5 gap-y-4 px-4 py-4">
          {QUICK_ACTIONS.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => pushToast(`${label} — demo only`)}
              className="flex flex-col items-center gap-1.5 text-[10px] text-fg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tint text-accent">
                <Icon size={18} />
              </span>
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={goToHoldings}
          className="flex w-full items-center justify-between border-y border-border bg-surface px-4 py-3"
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-fg">
            <BriefcaseIcon size={16} /> Portfolio (Today)
          </span>
          <ChevronRightIcon />
        </button>

        <div className="flex divide-x divide-border border-b border-border bg-surface px-4 py-3">
          <button onClick={goToHoldings} className="flex-1 pr-4 text-left">
            <p className="text-[11px] text-muted underline decoration-dotted">Positions P&amp;L (0)</p>
            <p className="mt-1 text-xs font-semibold text-fg">0.00</p>
          </button>
          <button onClick={goToHoldings} className="flex-1 pl-4 text-left">
            <p className="text-[11px] text-muted underline decoration-dotted">Holdings P&amp;L ({holdings.length})</p>
            <p className={`mt-1 text-xs font-semibold ${isUp ? "text-up" : "text-down"}`}>
              {isUp ? "+" : ""}
              {holdingsPnl.toFixed(2)} ({formatPct(holdingsPnlPct)})
            </p>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-3">
          {SHORTCUTS.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => pushToast("Demo only — not wired up")}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-[11px] font-medium text-fg"
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-border bg-tint px-4 py-4">
          <div>
            <p className="text-xs font-semibold text-fg">Your trading account is ready!</p>
            <p className="mt-1 text-[11px] text-muted">Place your first order right now!</p>
          </div>
          <button
            onClick={() => pushToast("This is a concept demo — no real account actions")}
            className="shrink-0 rounded-lg bg-accent px-3.5 py-2 text-[11px] font-semibold text-white"
          >
            Activate
          </button>
        </div>

        <div className="px-4 py-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-fg">
            <LineChartIcon size={16} /> Trending Stocks
          </p>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {TRENDING_TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => pushToast("Demo only — not wired up")}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                  i === 0 ? "border-accent-2 text-accent-2" : "border-border text-fg"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-3 divide-y divide-border">
            {trending.map((h) => (
              <div key={h.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tint text-[11px] font-semibold text-accent">
                    {h.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-fg">{h.symbol}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{h.sector}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-fg">{h.ltp.toFixed(2)}</p>
                  <p className={`mt-0.5 text-[11px] ${h.dayChangePct >= 0 ? "text-up" : "text-down"}`}>
                    {formatPct(h.dayChangePct)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
