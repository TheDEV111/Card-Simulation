export default function TruncatedText({ text, maxLength = 40, className = "" }) {
  if (!text || text.length <= maxLength) {
    return <span className={className}>{text}</span>;
  }

  const truncated = text.slice(0, maxLength) + "…";

  return (
    <span className={className} title={text}>
      {truncated}
    </span>
  );
}
