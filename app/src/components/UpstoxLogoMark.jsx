export default function UpstoxLogoMark({ size = 36 }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className="shrink-0"
      role="img"
      aria-label="Upstox"
    >
      <rect width="120" height="120" rx="26" fill="#3B1560" />

      {/* comma-like flourish above the "u" */}
      <path
        d="M52 26 C52 15 38 15 38 26 C38 35 45 41 55 41"
        stroke="#F4F0FA"
        strokeWidth="9.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* "u" */}
      <path
        d="M26 50 L26 76 A13 13 0 0 0 52 76 L52 50"
        stroke="#F4F0FA"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* "p" */}
      <path d="M71 50 L71 97" stroke="#F4F0FA" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="86" cy="71" r="14" stroke="#F4F0FA" strokeWidth="10" fill="none" />
    </svg>
  );
}
