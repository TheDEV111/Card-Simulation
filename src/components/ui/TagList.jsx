export default function TagList({ tags = [], className = "" }) {
  if (!tags.length) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/8 text-white/50 text-xs"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
