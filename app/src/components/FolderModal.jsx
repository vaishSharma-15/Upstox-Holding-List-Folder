import { useState } from "react";
import { FOLDER_COLORS, FOLDER_ICONS } from "../data/folderPalette";
import FolderIcon from "./FolderIcon";

const NAME_MAX_LENGTH = 24;

export default function FolderModal({ folder, onSave, onDelete, onClose }) {
  const isEditing = Boolean(folder);
  const [name, setName] = useState(folder?.name ?? "");
  const [color, setColor] = useState(folder?.color ?? FOLDER_COLORS[0]);
  const [icon, setIcon] = useState(folder?.icon ?? FOLDER_ICONS[0]);

  const trimmedName = name.trim();
  const canSave = trimmedName.length > 0 && trimmedName.length <= NAME_MAX_LENGTH;

  function handleSave() {
    if (!canSave) return;
    onSave({ name: trimmedName, color, icon });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-fade-in sm:items-center">
      <div className="w-full max-w-sm rounded-t-2xl bg-surface-2 p-6 shadow-2xl animate-slide-up sm:rounded-2xl">
        <p className="text-base font-semibold text-fg">
          {isEditing ? "Edit Folder" : "New Folder"}
        </p>

        <label className="mt-5 block text-xs text-muted">Folder name</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, NAME_MAX_LENGTH))}
          placeholder="e.g. Long Term"
          className="mt-2 w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-sm text-fg outline-none focus:border-accent"
        />
        <p className="mt-1 text-right text-xs text-muted">
          {trimmedName.length}/{NAME_MAX_LENGTH}
        </p>

        <p className="mt-4 text-xs text-muted">Color</p>
        <div className="mt-2.5 flex gap-2.5">
          {FOLDER_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={`Color ${c}`}
              className="h-9 w-9 rounded-full ring-offset-2 ring-offset-surface-2"
              style={{ backgroundColor: c, boxShadow: color === c ? `0 0 0 2px ${c}` : "none" }}
            />
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">Icon</p>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {FOLDER_ICONS.map((i) => (
            <button
              key={i}
              onClick={() => setIcon(i)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                icon === i ? "border-accent bg-accent/20 text-accent" : "border-border bg-surface text-fg"
              }`}
            >
              <FolderIcon id={i} size={18} />
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border py-3 text-sm font-medium text-fg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 rounded-lg bg-accent py-3 text-sm font-medium text-white disabled:opacity-40"
          >
            {isEditing ? "Save" : "Create"}
          </button>
        </div>

        {isEditing && (
          <button
            onClick={onDelete}
            className="mt-3 w-full rounded-lg py-2.5 text-sm font-medium text-down"
          >
            Delete Folder
          </button>
        )}
      </div>
    </div>
  );
}
