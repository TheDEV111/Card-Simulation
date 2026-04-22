import CopyButton from "./CopyButton";

export default function HashDisplay({ hash, chars = 8, showCopy = true, className = "" }) {
  if (!hash) return null;
  const display = hash.length > chars * 2
    ? `${hash.slice(0, chars)}…${hash.slice(-chars)}`
    : hash;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="font-mono text-xs text-white/60">{display}</span>
      {showCopy && <CopyButton text={hash} />}
    </span>
  );
}
