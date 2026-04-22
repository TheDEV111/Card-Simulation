import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function PageHeader({ title, subtitle, back, action, className }) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-8", className)}>
      <div className="space-y-1">
        {back && (
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-white/30 hover:text-white/60 transition-colors mb-2 flex items-center gap-1"
          >
            ← {back}
          </button>
        )}
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          {title}
        </h1>
        {subtitle && <p className="text-sm text-white/40">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 pt-1">{action}</div>}
    </div>
  );
}
