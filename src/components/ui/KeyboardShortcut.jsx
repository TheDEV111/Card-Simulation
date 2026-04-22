export default function KeyboardShortcut({ keys = [], className = "" }) {
  return (
    <kbd
      className={`inline-flex items-center gap-1 text-[10px] font-mono ${className}`}
      aria-label={keys.join("+")}
    >
      {keys.map((key, i) => (
        <span key={i}>
          <span className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-white/40">
            {key}
          </span>
          {i < keys.length - 1 && <span className="text-white/20">+</span>}
        </span>
      ))}
    </kbd>
  );
}
