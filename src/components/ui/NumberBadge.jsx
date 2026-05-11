export default function NumberBadge({ value, max = 99, className = "" }) {
  const display = value > max ? `${max}+` : value;

  if (!value || value === 0) return null;

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-surface text-[10px] font-bold leading-none ${className}`}
    >
      {display}
    </span>
  );
}
