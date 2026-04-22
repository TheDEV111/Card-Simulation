export default function SectionDivider({ label, className = "" }) {
  if (!label) {
    return <div className={`h-px bg-white/5 ${className}`} />;
  }
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-white/5" />
      <span className="text-xs text-white/20 uppercase tracking-widest font-medium">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}
