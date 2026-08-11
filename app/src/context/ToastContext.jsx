import { createContext, useContext, useRef, useState } from "react";

const TOAST_DURATION_MS = 2200;

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  function pushToast(message) {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }

  return <ToastContext.Provider value={{ toasts, pushToast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
