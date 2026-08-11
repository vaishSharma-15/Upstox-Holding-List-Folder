export default function UpstoxLogoMark({ size = 36 }) {
  return (
    <img
      src="/upstox-logo.png"
      alt="Upstox"
      width={size}
      height={size}
      className="shrink-0 rounded-[22%] object-cover"
      style={{ width: size, height: size }}
    />
  );
}
