export default function SkeletonText({ lines = 3, lastWidth = "60%", className = "" }) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
          style={{ width: i === lines - 1 ? lastWidth : "100%" }}
        />
      ))}
    </div>
  );
}
