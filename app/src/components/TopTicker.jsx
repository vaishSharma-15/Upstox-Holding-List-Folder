const INDICES = [
  { name: "NIFTY 50", exp: "Exp. 18 Aug", value: "24,471.70", change: "-112.10 (-0.46%)", isUp: false },
  { name: "SENSEX", exp: "Exp. 13 Aug", value: "78,154.25", change: "-388.19 (-0.49%)", isUp: false },
];

export default function TopTicker() {
  return (
    <div className="flex shrink-0 divide-x divide-border bg-tint px-4 py-3.5 text-sm">
      {INDICES.map((index) => (
        <div key={index.name} className={index === INDICES[0] ? "flex-1 pr-4" : "flex-1 pl-4"}>
          <p className="text-sm text-muted">
            {index.name} <span className="text-xs">{index.exp}</span>
          </p>
          <p className="mt-0.5 font-semibold text-fg">
            {index.value} <span className={index.isUp ? "text-up" : "text-down"}>{index.change}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
