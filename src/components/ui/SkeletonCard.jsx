export default function SkeletonCard({ lines = 3, className = "" }) {
  const lineWidths = ["w-3/4", "w-full", "w-1/2", "w-5/6", "w-2/3"];
  return (
    <div className={`panel p-5 space-y-3 animate-pulse ${className}`}>
      <div className="h-4 bg-white/10 rounded w-1/3" />
      <div className="h-px bg-white/5" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-3 bg-white/8 rounded ${lineWidths[i % lineWidths.length]}`} />
      ))}
    </div>
  );
}
