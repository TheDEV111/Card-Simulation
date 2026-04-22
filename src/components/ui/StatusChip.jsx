export default function StatusChip({ status, className = "" }) {
  const map = {
    win:     { label: "Win",     cls: "bg-win/15 text-win" },
    loss:    { label: "Loss",    cls: "bg-loss/15 text-loss" },
    pending: { label: "Pending", cls: "bg-gold/15 text-gold" },
    active:  { label: "Active",  cls: "bg-white/10 text-white/80" },
    closed:  { label: "Closed",  cls: "bg-white/5 text-white/30" },
  };
  const { label, cls } = map[status] ?? map.active;
  return (
    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${cls} ${className}`}>
      {label}
    </span>
  );
}
