export default function Shimmer({ width = "full", height = 4, rounded = "md", className = "" }) {
  const w = width === "full" ? "w-full" : `w-${width}`;
  const h = `h-${height}`;
  const r = `rounded-${rounded}`;
  return (
    <div
      className={`${w} ${h} ${r} bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] ${className}`}
      style={{
        animation: "shimmer 1.5s ease-in-out infinite",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
