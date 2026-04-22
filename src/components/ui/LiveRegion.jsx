export default function LiveRegion({ children, politeness = "polite", atomic = true, className = "" }) {
  return (
    <div
      aria-live={politeness}
      aria-atomic={atomic ? "true" : "false"}
      className={`sr-only ${className}`}
    >
      {children}
    </div>
  );
}
