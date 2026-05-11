import { useFeatureFlag } from "../../context/FeatureFlagContext";

export default function FeatureGate({ flag, fallback = null, children }) {
  const enabled = useFeatureFlag(flag);
  return enabled ? children : fallback;
}

export function FeatureSection({ flag, label, children }) {
  const enabled = useFeatureFlag(flag);
  if (!enabled) return null;
  return (
    <section>
      {label && <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{label}</h2>}
      {children}
    </section>
  );
}
