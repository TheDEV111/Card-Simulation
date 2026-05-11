const ICONS = {
  success: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  loading: (
    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  ),
};

const STYLES = {
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  loading: "text-gray-500 dark:text-gray-400",
};

export default function FeedbackMessage({ type = "loading", message, className = "" }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${STYLES[type] ?? STYLES.loading} ${className}`}>
      {ICONS[type]}
      <span>{message}</span>
    </div>
  );
}
