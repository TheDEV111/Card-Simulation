import Kbd from "./Kbd";

export default function ShortcutList({ shortcuts = [], className = "" }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {shortcuts.map(({ label, keys }) => (
        <div key={label} className="flex items-center justify-between gap-4 py-1.5">
          <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
          <div className="flex items-center gap-1">
            {(Array.isArray(keys) ? keys : [keys]).map((key, i) => (
              <>
                {i > 0 && <span key={`sep-${i}`} className="text-xs text-gray-400">+</span>}
                <Kbd key={key}>{key}</Kbd>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
