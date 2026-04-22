export default function ResponsiveText({ mobile, desktop, className = "" }) {
  return (
    <span className={className}>
      <span className="sm:hidden">{mobile}</span>
      <span className="hidden sm:inline">{desktop}</span>
    </span>
  );
}
