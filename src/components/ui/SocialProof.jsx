export default function SocialProof({ label = "Trusted by", logos = [], stats = [], className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      {label && <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>}
      {logos.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map(({ src, alt, width = 80 }) => (
            <img key={alt} src={src} alt={alt} width={width} className="opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all" />
          ))}
        </div>
      )}
      {stats.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
          {stats.map(({ value, label: l }) => (
            <div key={l} className="text-center">
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
