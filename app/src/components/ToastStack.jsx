export default function ToastStack({ toasts }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex flex-col items-center gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-in rounded-full border border-border bg-surface-2 px-4 py-2 text-xs font-medium text-fg shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
