import { useState } from "react";
import { useCopyText } from "../../hooks/useCopyText";

export default function ShareButton({ url, title, text, className = "" }) {
  const { copied, copy } = useCopyText({ duration: 2000 });
  const [shared, setShared] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ url: url ?? location.href, title, text });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {}
    } else {
      copy(url ?? location.href);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${copied || shared ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"} ${className}`}
    >
      {copied || shared ? "✓ Copied" : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}
