import { PlusIcon } from "./icons";

function isViewActive(activeView, view) {
  if (view.type !== activeView.type) return false;
  if (view.type === "folder") return view.folderId === activeView.folderId;
  return true;
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active ? "border-accent-2 bg-surface text-accent-2" : "border-border bg-surface text-fg"
      }`}
    >
      {children}
    </button>
  );
}

export default function FolderRail({ holdings, activeView, onSelectView, onCreateClick }) {
  const unassignedCount = holdings.filter((h) => h.folderIds.length === 0).length;

  return (
    <div className="flex shrink-0 gap-2.5 overflow-x-auto border-b border-border bg-surface px-4 py-3.5">
      <Chip active={isViewActive(activeView, { type: "all" })} onClick={() => onSelectView({ type: "all" })}>
        All
      </Chip>

      <Chip
        active={isViewActive(activeView, { type: "unassigned" })}
        onClick={() => onSelectView({ type: "unassigned" })}
      >
        Unassigned{unassignedCount > 0 ? ` (${unassignedCount})` : ""}
      </Chip>

      <button
        onClick={onCreateClick}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-dashed border-accent px-4 py-2 text-sm font-medium text-accent"
      >
        <PlusIcon /> New Folder
      </button>
    </div>
  );
}
