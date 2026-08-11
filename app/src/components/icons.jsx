const common = {
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ size = 20, children, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" {...common} {...rest}>
      {children}
    </svg>
  );
}

export function HomeIcon({ active, size = 22 }) {
  return (
    <Svg size={size} fill={active ? "currentColor" : "none"}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </Svg>
  );
}

export function ListIcon({ size = 22 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="4" width="8" height="8" rx="1.5" />
      <rect x="13" y="4" width="8" height="8" rx="1.5" />
      <rect x="3" y="14" width="8" height="6" rx="1.5" />
      <rect x="13" y="14" width="8" height="6" rx="1.5" />
    </Svg>
  );
}

export function CartIcon({ size = 22 }) {
  return (
    <Svg size={size}>
      <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function PositionsIcon({ size = 22 }) {
  return (
    <Svg size={size}>
      <path d="M7 3v18M17 3v18" />
      <path d="M7 8h6M11 16h6" />
      <path d="M17 5l4 3-4 3M7 13l-4 3 4 3" />
    </Svg>
  );
}

export function BriefcaseIcon({ active, size = 22 }) {
  return (
    <Svg size={size} fill={active ? "currentColor" : "none"}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </Svg>
  );
}

export function SearchIcon({ size = 18 }) {
  return (
    <Svg size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Svg>
  );
}

export function BellIcon({ size = 18 }) {
  return (
    <Svg size={size}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Svg>
  );
}

export function WalletIcon({ size = 18 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function PlusIcon({ size = 14 }) {
  return (
    <Svg size={size} strokeWidth="2.2">
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 18 }) {
  return (
    <Svg size={size}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

export function TargetIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </Svg>
  );
}

export function BarChartIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M5 20V10M12 20V4M19 20v-7" />
    </Svg>
  );
}

export function PieChartIcon({ size = 20 }) {
  return (
    <Svg size={size} strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" fill="currentColor" />
    </Svg>
  );
}

export function DropletIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M12 3s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12Z" />
    </Svg>
  );
}

export function MoneyBagIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M9 4h6l1.5 3h-9L9 4Z" />
      <path d="M7.5 7c-2 3-3 5.5-3 8a7.5 7.5 0 0 0 15 0c0-2.5-1-5-3-8" />
      <path d="M12 11v6M10 13h4" />
    </Svg>
  );
}

export function CandlestickIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M7 4v3M7 13v7M17 4v9M17 17v3" />
      <rect x="4.5" y="7" width="5" height="6" rx="0.8" />
      <rect x="14.5" y="9" width="5" height="8" rx="0.8" />
    </Svg>
  );
}

export function UmbrellaIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M4 12a8 8 0 0 1 16 0Z" />
      <path d="M12 12v7a2 2 0 0 1-3.2 1.6" />
      <path d="M12 4v1" />
    </Svg>
  );
}

export function StarIcon({ size = 20, active }) {
  return (
    <Svg size={size} fill={active ? "currentColor" : "none"}>
      <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />
    </Svg>
  );
}

export function GridIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </Svg>
  );
}

export function LineChartIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M4 19V5M4 19h16" />
      <path d="m6.5 15 3.5-4 3 2.5L18 8" />
    </Svg>
  );
}

export function RefreshIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 16" />
      <path d="M4 20v-4h4" />
    </Svg>
  );
}

export function ZapIcon({ size = 16 }) {
  return (
    <Svg size={size} fill="currentColor" strokeWidth="0">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </Svg>
  );
}

export function NewspaperIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="5" width="14" height="14" rx="1.5" />
      <path d="M17.5 8.5H20a1 1 0 0 1 1 1V17a2 2 0 0 1-2 2" />
      <path d="M7 9h7M7 12.5h7M7 16h4" />
    </Svg>
  );
}

export function CalendarIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </Svg>
  );
}

export function FolderGlyphIcon({ size = 20, active }) {
  return (
    <Svg size={size} fill={active ? "currentColor" : "none"}>
      <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17Z" />
    </Svg>
  );
}

export function CheckCircleIcon({ size = 28 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.4 2.4 4.8-5.2" />
    </Svg>
  );
}

export function TrendDownIcon({ size = 28 }) {
  return (
    <Svg size={size}>
      <path d="m4 8 6.5 6.5L14 11l6 6" />
      <path d="M20 12v5h-5" />
    </Svg>
  );
}

export function CheckIcon({ size = 12 }) {
  return (
    <Svg size={size} strokeWidth="2.6">
      <path d="m5 12 5 5 9-9" />
    </Svg>
  );
}

export function MoreVerticalIcon({ size = 18 }) {
  return (
    <Svg size={size} fill="currentColor" strokeWidth="0">
      <circle cx="12" cy="5.5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="18.5" r="1.6" />
    </Svg>
  );
}

export function BankIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M4 10 12 4l8 6" />
      <path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" />
      <path d="M3.5 19h17" />
    </Svg>
  );
}

export function PillIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)" />
      <path d="m9.5 8.7 4.8 6.6" />
    </Svg>
  );
}

export function CarIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M4 16v-3.5L6 8h12l2 4.5V16" />
      <path d="M4 16h16" />
      <circle cx="7.5" cy="16.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16.5" r="1.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FlameIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M12 3c1 3-3 4-3 7.5A3.5 3.5 0 0 0 12 14a2 2 0 0 0 2-2c1.5 1 2.5 2.7 2.5 4.5A4.5 4.5 0 0 1 12 21a6 6 0 0 1-6-6c0-4 3-6 3-9 1 .5 2 1.5 2 3.5.7-1 1-2.5 1-6.5Z" />
    </Svg>
  );
}
