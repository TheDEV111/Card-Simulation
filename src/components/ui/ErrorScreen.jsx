import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function ErrorScreen({ message = "Something went wrong", code, onRetry }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-6 text-center px-4 py-12">
      <div className="text-4xl font-bold text-white/10" style={{ fontFamily: "Cinzel, serif" }}>
        {code ?? "ERR"}
      </div>
      <div className="space-y-2 max-w-sm">
        <p className="text-lg text-white/60">{message}</p>
        <p className="text-sm text-white/25">If the issue persists, please reload the page.</p>
      </div>
      <div className="flex gap-3">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary text-sm px-5 py-2.5">
            Try again
          </button>
        )}
        <button
          onClick={() => navigate(ROUTES.home)}
          className="text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          Go home
        </button>
      </div>
    </div>
  );
}
