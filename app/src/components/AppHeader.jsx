import { SearchIcon, BellIcon, WalletIcon, ZapIcon } from "./icons";
import UpstoxLogoMark from "./UpstoxLogoMark";

export default function AppHeader({ placeholder, showPlus, onPlusClick, onBellClick, onWalletClick }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-border bg-surface px-4 py-3">
      <UpstoxLogoMark size={34} />

      <div className="flex flex-1 items-center gap-2 rounded-full bg-tint px-3 py-2 text-muted">
        <SearchIcon size={16} />
        <span className="truncate text-[11px]">{placeholder}</span>
      </div>

      <button
        onClick={onBellClick}
        aria-label="Notifications"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-fg"
      >
        <BellIcon size={16} />
      </button>

      <button
        onClick={onWalletClick}
        aria-label="Account"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-fg"
      >
        <WalletIcon size={16} />
      </button>

      {showPlus && (
        <button
          onClick={onPlusClick}
          className="flex h-9 shrink-0 items-center gap-1 rounded-xl bg-fg px-2.5 text-[11px] font-semibold text-ink"
        >
          <ZapIcon size={11} /> Plus
        </button>
      )}
    </div>
  );
}
