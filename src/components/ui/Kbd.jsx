export default function Kbd({ children }) {
  return (
    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-white/20 bg-surface-overlay text-white/60 text-xs font-mono leading-none">
      {children}
    </kbd>
  );
}
