import { createContext, useContext, useState, useCallback, useRef } from "react";

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const cache = useRef(new Map());

  const play = useCallback((src, options = {}) => {
    if (muted) return;
    let audio = cache.current.get(src);
    if (!audio) {
      audio = new Audio(src);
      cache.current.set(src, audio);
    }
    audio.volume = options.volume ?? volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [muted, volume]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <SoundContext.Provider value={{ muted, volume, setVolume, toggleMute, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound requires SoundProvider");
  return ctx;
}
