export default function InputGroup({ prefix, suffix, children, className = "" }) {
  return (
    <div className={`flex items-stretch rounded-lg border border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 ${className}`}>
      {prefix && (
        <div className="flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
          {prefix}
        </div>
      )}
      <div className="flex-1 [&>input]:w-full [&>input]:border-0 [&>input]:bg-transparent [&>input]:px-3 [&>input]:py-2 [&>input]:text-sm [&>input]:outline-none [&>input]:text-gray-900 dark:[&>input]:text-white">
        {children}
      </div>
      {suffix && (
        <div className="flex items-center rounded-r-lg border-l border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
          {suffix}
        </div>
      )}
    </div>
  );
}
