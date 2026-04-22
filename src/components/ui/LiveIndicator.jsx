export default function LiveIndicator({ label = "Live" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-2xs text-white/40">
      <span className="w-1.5 h-1.5 rounded-full bg-win animate-pulse" />
      {label}
    </span>
  );
}
