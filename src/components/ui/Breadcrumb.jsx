import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs text-white/40">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-white/20">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-white/70 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white/60">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
