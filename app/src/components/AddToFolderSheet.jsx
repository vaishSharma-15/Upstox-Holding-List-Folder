import FolderIcon from "./FolderIcon";
import { CheckIcon, PlusIcon } from "./icons";

export default function AddToFolderSheet({ holding, folders, onToggleFolder, onCreateFolderClick, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-fade-in sm:items-center">
      <div className="w-full max-w-sm rounded-t-2xl bg-surface-2 p-6 shadow-2xl animate-slide-up sm:rounded-2xl">
        <p className="text-sm font-semibold text-fg">Add to folder</p>
        <p className="mt-1.5 text-[11px] text-muted">{holding.symbol} · {holding.name}</p>

        <div className="mt-5 max-h-72 space-y-1.5 overflow-y-auto">
          {folders.length === 0 && (
            <p className="py-6 text-center text-xs text-muted">No folders yet — create one below.</p>
          )}

          {folders.map((folder) => {
            const checked = holding.folderIds.includes(folder.id);
            return (
              <button
                key={folder.id}
                onClick={() => onToggleFolder(folder.id)}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 hover:bg-tint"
              >
                <span className="flex items-center gap-3 text-xs text-fg">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${folder.color}33`, color: folder.color }}
                  >
                    <FolderIcon id={folder.icon} size={16} />
                  </span>
                  {folder.name}
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    checked ? "border-accent bg-accent text-white" : "border-border text-transparent"
                  }`}
                >
                  <CheckIcon size={11} />
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onCreateFolderClick}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-accent py-2.5 text-xs font-medium text-accent"
        >
          <PlusIcon /> New Folder
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-lg border border-border py-2.5 text-xs font-medium text-fg"
        >
          Done
        </button>
      </div>
    </div>
  );
}
