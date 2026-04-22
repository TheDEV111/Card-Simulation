export default function SplitLayout({ left, right, ratio = "2fr 1fr", gap = 6, className = "" }) {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{ gridTemplateColumns: ratio }}
    >
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  );
}
