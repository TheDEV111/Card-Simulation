export default function SkeletonRow({ cols = 3, className = "" }) {
  const widths = ["w-24", "w-16", "w-20", "w-32", "w-12", "w-28"];
  return (
    <div className={`flex items-center gap-4 px-4 py-3 ${className}`}>
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          className={`h-3 ${widths[i % widths.length]} bg-white/8 rounded animate-pulse`}
        />
      ))}
    </div>
  );
}
