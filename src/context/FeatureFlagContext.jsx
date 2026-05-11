import { createContext, useContext, useState } from "react";

const FeatureFlagContext = createContext(null);

export function FeatureFlagProvider({ flags: initialFlags = {}, children }) {
  const [flags, setFlags] = useState(initialFlags);

  function enable(flag) {
    setFlags((f) => ({ ...f, [flag]: true }));
  }

  function disable(flag) {
    setFlags((f) => ({ ...f, [flag]: false }));
  }

  function toggle(flag) {
    setFlags((f) => ({ ...f, [flag]: !f[flag] }));
  }

  function isEnabled(flag) {
    return Boolean(flags[flag]);
  }

  return (
    <FeatureFlagContext.Provider value={{ flags, isEnabled, enable, disable, toggle }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlag(flag) {
  const ctx = useContext(FeatureFlagContext);
  if (!ctx) throw new Error("useFeatureFlag requires FeatureFlagProvider");
  return ctx.isEnabled(flag);
}

export function useFeatureFlags() {
  const ctx = useContext(FeatureFlagContext);
  if (!ctx) throw new Error("useFeatureFlags requires FeatureFlagProvider");
  return ctx;
}
