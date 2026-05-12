const COL_CLASS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export default function GridLayout({ children, cols = 3, gap = "gap-4", className = "" }) {
  return (
    <div className={`grid ${COL_CLASS[cols] ?? COL_CLASS[3]} ${gap} ${className}`}>
      {children}
    </div>
  );
}

export function MasonryLayout({ children, cols = 3, gap = "gap-4", className = "" }) {
  return (
    <div className={`columns-1 sm:columns-2 ${cols >= 3 ? "lg:columns-3" : ""} ${gap} ${className}`}>
      {children}
    </div>
  );
}
