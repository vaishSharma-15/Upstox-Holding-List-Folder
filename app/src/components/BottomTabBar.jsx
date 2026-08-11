import { HomeIcon, ListIcon, CartIcon, PositionsIcon, BriefcaseIcon } from "./icons";

const TABS = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "lists", label: "My lists", Icon: ListIcon },
  { key: "orders", label: "Orders", Icon: CartIcon },
  { key: "positions", label: "Positions", Icon: PositionsIcon },
  { key: "holdings", label: "Holdings", Icon: BriefcaseIcon },
];

export default function BottomTabBar({ active, onSelect }) {
  return (
    <nav className="flex border-t border-border bg-surface px-1 pb-1.5 pt-2">
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex flex-1 flex-col items-center gap-1 py-1 text-[10px] ${
              isActive ? "font-semibold text-fg" : "text-muted"
            }`}
          >
            <Icon active={isActive} size={20} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
