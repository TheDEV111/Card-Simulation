export default function TwoColLayout({ left, right, flip = false, gap = "gap-8", className = "" }) {
  return (
    <div className={`grid sm:grid-cols-2 items-start ${gap} ${className}`}>
      <div className={flip ? "sm:order-2" : ""}>{left}</div>
      <div className={flip ? "sm:order-1" : ""}>{right}</div>
    </div>
  );
}
