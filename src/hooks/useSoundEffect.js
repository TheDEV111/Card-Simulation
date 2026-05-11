import { useCallback } from "react";
import { useSound } from "../context/SoundContext";

export function useSoundEffect(src, options = {}) {
  const { play, muted } = useSound();
  return useCallback(() => play(src, options), [play, src, options, muted]);
}
