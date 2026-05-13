export function ThreadCount({ count = 0, onClick, avatars = [], className = "" }) {
  if (count === 0 && !onClick) return null;

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 disabled:pointer-events-none transition-colors ${className}`}
    >
      {avatars.length > 0 && (
        <span className="flex -space-x-1">
          {avatars.slice(0, 3).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-5 h-5 rounded-full ring-1 ring-white object-cover"
            />
          ))}
        </span>
      )}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span className="font-medium">
        {count} {count === 1 ? "reply" : "replies"}
      </span>
    </button>
  );
}
