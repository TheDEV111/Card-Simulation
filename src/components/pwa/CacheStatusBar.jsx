import { useEffect } from "react";
import { useCacheStorage } from "../../hooks/useCacheStorage.js";

export function CacheStatusBar({ className = "" }) {
  const { sizes, totalFormatted, refresh, loading } = useCacheStorage();

  useEffect(() => { refresh(); }, []);

  const cacheCount = Object.values(sizes).filter((s) => s.bytes > 0).length;

  return (
    <div className={`flex items-center gap-3 text-xs ${className}`}
      style={{ color: "rgba(226,226,232,0.4)", fontFamily: "Barlow, sans-serif" }}>
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        style={{ color: loading ? "#d4a84b" : "inherit", transition: "color 0.3s" }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <span>Cache: {loading ? "…" : `${totalFormatted} across ${cacheCount} caches`}</span>
    </div>
  );
}
