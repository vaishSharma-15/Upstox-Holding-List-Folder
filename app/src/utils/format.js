const number = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const intNumber = new Intl.NumberFormat("en-IN");

// Upstox displays plain Indian-grouped numbers, no currency symbol.
export function formatNumber(value) {
  return number.format(value);
}

export function formatQty(value) {
  return intNumber.format(value);
}

export function formatPct(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function computeHoldingMetrics(holding) {
  const invested = holding.qty * holding.avgPrice;
  const current = holding.qty * holding.ltp;
  const pnl = current - invested;
  const pnlPct = invested === 0 ? 0 : (pnl / invested) * 100;
  return { invested, current, pnl, pnlPct };
}
