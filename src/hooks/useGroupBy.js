import { useMemo } from "react";
import { groupBy, countBy, keyBy } from "../utils/groupBy";

export function useGroupBy(items, key) {
  return useMemo(() => groupBy(items, key), [items, key]);
}

export function useCountBy(items, key) {
  return useMemo(() => countBy(items, key), [items, key]);
}

export function useKeyBy(items, key) {
  return useMemo(() => keyBy(items, key), [items, key]);
}
