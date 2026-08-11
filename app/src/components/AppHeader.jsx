import { SearchIcon, BellIcon, WalletIcon, ZapIcon } from "./icons";
import UpstoxLogoMark from "./UpstoxLogoMark";

export default function AppHeader({ placeholder, showPlus, onPlusClick, onBellClick, onWalletClick }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 border-b border-border bg-surface px-4 py-4">
      <UpstoxLogoMark size={40} />

      <div className="flex flex-1 items-center gap-2 rounded-full bg-tint px-3.5 py-2.5 text-muted">
        <SearchIcon />
        <span className="truncate text-sm">{placeholder}</span>
      </div>

      <button
        onClick={onBellClick}
        aria-label="Notifications"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-fg"
      >
        <BellIcon />
      </button>

      <button
        onClick={onWalletClick}
        aria-label="Account"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-fg"
      >
        <WalletIcon />
      </button>

      {showPlus && (
        <button
          onClick={onPlusClick}
          className="flex h-10 shrink-0 items-center gap-1 rounded-xl bg-fg px-3 text-[13px] font-semibold text-ink"
        >
          <ZapIcon size={13} /> Plus
        </button>
      )}
    </div>
  );
}
