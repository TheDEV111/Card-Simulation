export function TypingIndicator({ names = [], className = "" }) {
  if (!names.length) return null;

  const label =
    names.length === 1
      ? `${names[0]} is typing`
      : names.length === 2
      ? `${names[0]} and ${names[1]} are typing`
      : `${names[0]} and ${names.length - 1} others are typing`;

  return (
    <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
      <span className="flex items-center gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "600ms" }}
          />
        ))}
      </span>
      <span>{label}…</span>
    </div>
  );
}
