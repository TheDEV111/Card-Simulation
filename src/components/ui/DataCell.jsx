export default function DataCell({ label, value, align = "left", mono = false, className = "" }) {
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  return (
    <td className={`px-4 py-3 ${alignClass} ${className}`}>
      <span className={`text-sm ${mono ? "font-mono" : ""} text-white/70`}>{value}</span>
      {label && <span className="sr-only">{label}: </span>}
    </td>
  );
}
