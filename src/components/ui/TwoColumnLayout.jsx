export default function TwoColumnLayout({ main, aside, asideWidth = "w-80", sticky = false, className = "" }) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row ${className}`}>
      <div className="flex-1 min-w-0">{main}</div>
      <div className={`shrink-0 ${asideWidth}`}>
        <div className={sticky ? "sticky top-6" : ""}>{aside}</div>
      </div>
    </div>
  );
}
