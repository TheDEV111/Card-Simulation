import { useEffect, useState } from "react";
import { querySW } from "../../pwa/sw-messages.js";

export function VersionDisplay({ className = "" }) {
  const [version, setVersion] = useState(null);
  const appVersion = import.meta.env.VITE_APP_VERSION ?? "dev";

  useEffect(() => {
    querySW("GET_VERSION").then(({ version: v }) => setVersion(v)).catch(() => {});
  }, []);

  return (
    <span className={`text-xs tabular-nums ${className}`}
      style={{ color: "rgba(226,226,232,0.25)", fontFamily: "Barlow, sans-serif" }}>
      {appVersion}
      {version && version !== appVersion && (
        <span style={{ color: "rgba(212,168,75,0.5)" }}> → {version}</span>
      )}
    </span>
  );
}
