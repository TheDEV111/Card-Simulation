export default function QuoteCard({ quote, author, role, avatar, className = "" }) {
  return (
    <figure className={`rounded-2xl bg-gray-50 p-6 dark:bg-gray-800/50 ${className}`}>
      <blockquote className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <span className="mr-1 text-2xl font-serif text-indigo-300">"</span>
        {quote}
        <span className="ml-1 text-2xl font-serif text-indigo-300">"</span>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt={author} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
            {author?.[0]}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{author}</p>
          {role && <p className="text-xs text-gray-400">{role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
