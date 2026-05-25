import { useWebShare } from "../../hooks/useWebShare.js";
import { shareScore } from "../../pwa/share.js";

export function ShareScoreButton({ score, address, className = "" }) {
  const { supported, sharing, shared, share } = useWebShare();

  if (!supported) return null;

  const handleShare = () => share({ title: "Stacks Card Game", text: `I just won ${score} µSTX! 🃏` });

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 disabled:opacity-60 ${className}`}
      style={{
        background: shared ? "rgba(34,197,94,0.1)" : "rgba(212,168,75,0.1)",
        color: shared ? "#22c55e" : "#d4a84b",
        border: `1px solid ${shared ? "rgba(34,197,94,0.2)" : "rgba(212,168,75,0.2)"}`,
        fontFamily: "Barlow, sans-serif",
      }}
    >
      {shared ? (
        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>Shared!</>
      ) : (
        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>Share Result</>
      )}
    </button>
  );
}
