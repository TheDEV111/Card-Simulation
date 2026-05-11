export default function Kbd({ children, className = "" }) {
  return (
    <kbd
      className={`inline-flex items-center gap-0.5 rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 ${className}`}
    >
      {children}
    </kbd>
  );
}
