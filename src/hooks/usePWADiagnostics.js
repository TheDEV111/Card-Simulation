import { useState, useCallback } from "react";
import { runDiagnostics } from "../pwa/diagnostics.js";

export function usePWADiagnostics() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await runDiagnostics();
      setResults(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const score = results ? computeScore(results) : null;

  return { results, score, loading, error, run };
}

function computeScore(r) {
  let pts = 0;
  if (r.https) pts += 20;
  if (r.serviceWorker.supported) pts += 15;
  if (r.serviceWorker.registered) pts += 15;
  if (r.manifest.linked) pts += 15;
  if (r.push.supported) pts += 10;
  if (r.push.permission === "granted") pts += 10;
  if (r.sync.backgroundSync) pts += 10;
  if (r.installability.isInstalled) pts += 5;
  return pts;
}
