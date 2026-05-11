export default function DragHandle({ className = "" }) {
  return (
    <div
      className={`cursor-grab active:cursor-grabbing touch-none select-none text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 ${className}`}
      aria-hidden="true"
    >
      <svg width="12" height="20" viewBox="0 0 12 20" fill="currentColor">
        <circle cx="3" cy="4" r="1.5" />
        <circle cx="9" cy="4" r="1.5" />
        <circle cx="3" cy="10" r="1.5" />
        <circle cx="9" cy="10" r="1.5" />
        <circle cx="3" cy="16" r="1.5" />
        <circle cx="9" cy="16" r="1.5" />
      </svg>
    </div>
  );
}
