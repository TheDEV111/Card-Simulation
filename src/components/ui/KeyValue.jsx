export default function KeyValue({ pairs, className = "" }) {
  return (
    <dl className={`space-y-2 ${className}`}>
      {pairs.map(({ key, value }) => (
        <div key={key} className="flex items-start justify-between gap-4">
          <dt className="text-xs text-white/40 flex-shrink-0">{key}</dt>
          <dd className="text-xs text-white/80 text-right break-all">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
