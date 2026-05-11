import { useMemo } from "react";
import { logger } from "../services/logger";

export function useLogger(prefix) {
  return useMemo(() => (prefix ? logger.child(prefix) : logger), [prefix]);
}
