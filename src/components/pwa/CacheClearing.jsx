import { useState } from "react";
import { useCacheStorage } from "../../hooks/useCacheStorage.js";
import { PWA_CONFIG } from "../../pwa/config.js";

export function CacheClearing() {
  const { sizes, totalFormatted, clear, clearAll, loading, refresh } = useCacheStorage();
  const [clearing, setClearing] = useState(null);

  const handleClear = async (key) => {
    setClearing(key);
    await clear(key);
    setClearing(null);
  };

  const handleClearAll = async () => {
    setClearing("all");
    await clearAll();
    setClearing(null);
  };

  return (
    <div className="space-y-2">
      {Object.entries(PWA_CONFIG.CACHE_NAMES).map(([key, name]) => {
        const info = sizes[key];
        if (!info || info.bytes === 0) return null;
        return (
          <div key={key} className="flex items-center justify-between py-2 px-3 rounded-lg"
            style={{ background: "rgba(226,226,232,0.03)", border: "1px solid rgba(226,226,232,0.04)" }}>
            <div>
              <p className="text-xs font-medium" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>{key}</p>
              <p className="text-xs" style={{ color: "rgba(226,226,232,0.35)" }}>{info.formatted}</p>
            </div>
            <button
              onClick={() => handleClear(key)}
              disabled={clearing === key || loading}
              className="text-xs disabled:opacity-40"
              style={{ color: "#ef4444", fontFamily: "Barlow, sans-serif" }}
            >
              {clearing === key ? "…" : "Clear"}
            </button>
          </div>
        );
      }).filter(Boolean)}
      <button
        onClick={handleClearAll}
        disabled={!!clearing || loading}
        className="w-full py-2 rounded-xl text-xs font-semibold mt-2 disabled:opacity-40 transition-all"
        style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.15)", fontFamily: "Barlow, sans-serif" }}
      >
        {clearing === "all" ? "Clearing…" : `Clear All Caches (${totalFormatted})`}
      </button>
    </div>
  );
}
