export default function FormField({ label, htmlFor, error, hint, required, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500" aria-hidden>*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-500" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}
