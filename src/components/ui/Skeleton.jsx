import { cn } from "../../utils/cn";

export function SkeletonLine({ className }) {
  return <div className={cn("skeleton h-4 w-full", className)} />;
}

export function SkeletonRect({ className }) {
  return <div className={cn("skeleton", className)} />;
}

export function SkeletonCircle({ size = 40 }) {
  return (
    <div
      className="skeleton rounded-full shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="panel p-5 space-y-3">
      <SkeletonLine className="w-1/3 h-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} className={i === lines - 1 ? "w-2/3" : "w-full"} />
      ))}
    </div>
  );
}
