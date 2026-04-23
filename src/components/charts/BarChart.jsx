export default function BarChart({
  data = [],
  valueKey = "value",
  labelKey = "label",
  color = "bg-gold/40",
  activeColor = "bg-gold",
  height = 80,
  className = "",
}) {
  const values = data.map((d) => d[valueKey] ?? 0);
  const max    = Math.max(...values, 1);

  return (
    <div className={`flex items-end gap-0.5 ${className}`} style={{ height }} role="img" aria-label="Bar chart">
      {data.map((d, i) => {
        const val = d[valueKey] ?? 0;
        const pct = Math.max(4, Math.round((val / max) * 100));
        return (
          <div
            key={i}
            className="flex-1 flex flex-col justify-end"
            title={`${d[labelKey] ?? i}: ${val}`}
          >
            <div
              className={`rounded-sm transition-all ${val === max ? activeColor : color}`}
              style={{ height: `${pct}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
