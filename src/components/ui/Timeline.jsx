export default function Timeline({ items = [], className = "" }) {
  return (
    <ol className={`relative space-y-4 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
            {i < items.length - 1 && <div className="w-px flex-1 bg-white/10 mt-1" />}
          </div>
          <div className="pb-4 min-w-0">
            {item.label && (
              <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
            )}
            <p className="text-sm text-white/80">{item.content}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
