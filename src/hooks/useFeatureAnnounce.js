import { useState, useCallback } from "react";

const STORAGE_KEY = "seen_features";

function getSeenSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function markSeen(id) {
  const seen = getSeenSet();
  seen.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]));
}

export function useFeatureAnnounce(featureId) {
  const [dismissed, setDismissed] = useState(() => getSeenSet().has(featureId));

  const dismiss = useCallback(() => {
    markSeen(featureId);
    setDismissed(true);
  }, [featureId]);

  return { shouldShow: !dismissed, dismiss };
}
