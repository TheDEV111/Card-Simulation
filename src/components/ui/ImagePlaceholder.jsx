export default function ImagePlaceholder({ width, height, label, className = "" }) {
  const ratio = height && width ? (height / width) * 100 : undefined;

  return (
    <div
      className={`bg-white/5 border border-white/8 rounded-lg flex items-center justify-center text-white/20 text-xs ${className}`}
      style={ratio ? { paddingBottom: `${ratio}%`, position: "relative" } : { width, height }}
      role="img"
      aria-label={label ?? "Image placeholder"}
    >
      {ratio ? (
        <span className="absolute inset-0 flex items-center justify-center">
          {label ?? `${width} × ${height}`}
        </span>
      ) : (
        label ?? `${width} × ${height}`
      )}
    </div>
  );
}
