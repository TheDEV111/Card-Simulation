export default function SmartPagination({ page, totalPages, onPage, className = "" }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-1 ${className}`}>
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/8 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
      >
        ‹
      </button>
      {getPages().map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-white/20 text-xs">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p)}
            aria-current={p === page ? "page" : undefined}
            className={`min-w-[32px] h-8 rounded-lg text-xs transition-colors ${
              p === page
                ? "bg-gold text-black font-semibold"
                : "text-white/40 hover:text-white hover:bg-white/8"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/8 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
      >
        ›
      </button>
    </nav>
  );
}
