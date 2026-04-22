export default function Monospace({ children, size = "xs", muted = true, className = "" }) {
  const sizes = { xs: "text-xs", sm: "text-sm", base: "text-base" };
  return (
    <span className={`font-mono ${sizes[size] ?? sizes.xs} ${muted ? "text-white/50" : "text-white"} ${className}`}>
      {children}
    </span>
  );
}
