import { cn } from "../../utils/cn";

export default function Pagination({ page, total, perPage = 20, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  const rendered = [];
  let prev = null;
  for (const p of pages) {
    if (prev && p - prev > 1) rendered.push("…");
    rendered.push(p);
    prev = p;
  }

  return (
    <div className="flex items-center gap-1">
      <PageBtn onClick={() => onChange(page - 1)} disabled={page === 1}>←</PageBtn>
      {rendered.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-white/20 text-sm select-none">…</span>
        ) : (
          <PageBtn key={p} active={p === page} onClick={() => onChange(p)}>{p}</PageBtn>
        )
      )}
      <PageBtn onClick={() => onChange(page + 1)} disabled={page === totalPages}>→</PageBtn>
    </div>
  );
}

function PageBtn({ children, active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-8 h-8 rounded-lg text-sm transition-all duration-150",
        active
          ? "bg-gold text-surface font-semibold"
          : "text-white/50 hover:text-white hover:bg-surface-overlay",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}
