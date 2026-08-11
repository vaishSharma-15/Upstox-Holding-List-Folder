import { useEffect, useState } from "react";

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" width="17" height="11" fill="currentColor">
      <rect x="0" y="7" width="3" height="5" rx="0.8" />
      <rect x="5" y="5" width="3" height="7" rx="0.8" />
      <rect x="10" y="3" width="3" height="9" rx="0.8" />
      <rect x="15" y="0" width="3" height="12" rx="0.8" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 18 13" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M1.5 4.8a12 12 0 0 1 15 0" />
      <path d="M4.3 7.8a8 8 0 0 1 9.4 0" />
      <path d="M7.1 10.7a4 4 0 0 1 3.8 0" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 26 13" width="24" height="12" fill="none">
      <rect x="0.8" y="0.8" width="21.5" height="11.4" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2.3" y="2.3" width="16.5" height="8.4" rx="1.8" fill="currentColor" />
      <rect x="23.2" y="4" width="1.8" height="5" rx="0.9" fill="currentColor" />
    </svg>
  );
}

export default function StatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden h-11 items-center justify-between px-8 pt-1.5 text-[15px] font-semibold text-fg sm:flex">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function formatTime(date) {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
