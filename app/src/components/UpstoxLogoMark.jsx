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
      <rect width="120" height="120" rx="30" fill="#3A1660" />
      <path
        d="M27 38 C27 50 35 58 47 58"
        stroke="#F5F1FA"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="34"
        y="90"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="58"
        fill="#F5F1FA"
      >
        up
      </text>
    </svg>
  );
}
