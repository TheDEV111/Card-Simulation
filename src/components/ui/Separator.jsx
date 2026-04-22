export default function Separator({ orientation = "horizontal", className = "" }) {
  if (orientation === "vertical") {
    return <div className={`w-px bg-white/8 self-stretch ${className}`} />;
  }
  return <div className={`h-px w-full bg-white/8 ${className}`} />;
}
