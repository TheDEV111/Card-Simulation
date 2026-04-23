export default function CountBadge({ count, max = 99, className = "" }) {
  if (!count || count <= 0) return null;
  const label = count > max ? `${max}+` : count;

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-loss text-white text-[10px] font-bold leading-none ${className}`}
      aria-label={`${count} notifications`}
    >
      {label}
    </span>
  );
}
