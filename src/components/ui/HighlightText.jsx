export default function HighlightText({ text, query, className = "" }) {
  if (!query || !text) return <span className={className}>{text}</span>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-gold/20 text-gold rounded px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
