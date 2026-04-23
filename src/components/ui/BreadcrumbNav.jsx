import { Link } from "react-router-dom";

export default function BreadcrumbNav({ crumbs = [], className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-xs text-white/30 ${className}`}>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden>/</span>}
          {c.href ? (
            <Link to={c.href} className="hover:text-white/60 transition-colors">{c.label}</Link>
          ) : (
            <span className="text-white/60" aria-current="page">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
