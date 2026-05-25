import { useAutoWakeLock } from "../../hooks/useAutoWakeLock.js";

export function WakeLockGuard({ children, enabled = true }) {
  useAutoWakeLock(enabled);
  return children ?? null;
}
