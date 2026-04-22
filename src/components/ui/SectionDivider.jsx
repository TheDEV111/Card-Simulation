export default function SectionDivider({ label }) {
  if (!label) {
    return <div className="h-px bg-white/5 my-8" />;
  }

  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-white/5" />
      <span className="text-xs text-white/25 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}
