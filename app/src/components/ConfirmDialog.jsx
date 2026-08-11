export default function ConfirmDialog({ title, message, confirmLabel = "Delete", onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-fade-in sm:items-center">
      <div className="w-full max-w-sm rounded-t-2xl bg-surface-2 p-6 shadow-2xl animate-slide-up sm:rounded-2xl">
        <p className="text-base font-semibold text-fg">{title}</p>
        <p className="mt-2.5 text-xs text-muted">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border py-3 text-sm font-medium text-fg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-down py-3 text-sm font-medium text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
