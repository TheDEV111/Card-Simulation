import { useState, useEffect } from "react";
import { isFirstRun, markVersionSeen, hasVersionChanged } from "../pwa/app-version.js";

export function useFirstRun() {
  const [firstRun] = useState(() => isFirstRun());
  const [versionChanged] = useState(() => hasVersionChanged());

  useEffect(() => {
    markVersionSeen();
  }, []);

  return { firstRun, versionChanged };
}
