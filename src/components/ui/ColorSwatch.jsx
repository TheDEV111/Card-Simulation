export default function ColorSwatch({ color, label, selected, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className={`w-7 h-7 rounded-full transition-all duration-200 ${
        selected ? "ring-2 ring-white ring-offset-2 ring-offset-surface scale-110" : "hover:scale-105"
      } ${className}`}
      style={{ background: color }}
    />
  );
}
