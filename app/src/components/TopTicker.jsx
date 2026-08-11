const INDICES = [
  { name: "NIFTY 50", exp: "Exp. 18 Aug", value: "24,583.80", change: "+13.15 (+0.05%)", isUp: true },
  { name: "SENSEX", exp: "Exp. 13 Aug", value: "78,199.43", change: "-343.01 (-0.44%)", isUp: false },
];

export default function TopTicker() {
  return (
    <div className="grid shrink-0 grid-cols-2 divide-x divide-border bg-tint px-4 py-2 text-xs">
      {INDICES.map((index, i) => (
        <div key={index.name} className={i === 0 ? "pr-4" : "pl-4"}>
          <p className="truncate text-[11px] leading-tight text-muted">
            {index.name} <span className="text-[10px]">{index.exp}</span>
          </p>
          <p className="mt-1 whitespace-nowrap text-xs font-semibold leading-tight tabular-nums text-fg">
            {index.value}
          </p>
          <p
            className={`mt-0.5 whitespace-nowrap text-[11px] font-medium leading-tight tabular-nums ${
              index.isUp ? "text-up" : "text-down"
            }`}
          >
            {index.change}
          </p>
        </div>
      ))}
    </div>
  );
}
