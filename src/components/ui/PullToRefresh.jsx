import { useRef, useState } from "react";
import SpinnerRing from "./SpinnerRing";

export default function PullToRefresh({ onRefresh, threshold = 60, children }) {
  const startY  = useRef(null);
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const onTouchMove  = (e) => {
    if (startY.current === null || window.scrollY > 0) return;
    setPull(Math.min(threshold * 1.5, Math.max(0, e.touches[0].clientY - startY.current)));
  };
  const onTouchEnd   = async () => {
    if (pull >= threshold) {
      setRefreshing(true);
      await onRefresh?.();
      setRefreshing(false);
    }
    setPull(0);
    startY.current = null;
  };

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {(pull > 0 || refreshing) && (
        <div
          className="flex items-center justify-center text-white/30"
          style={{ height: refreshing ? 48 : pull, overflow: "hidden", transition: pull === 0 ? "height 0.3s ease" : "none" }}
        >
          <SpinnerRing size={20} color={pull >= threshold ? "text-gold" : "text-white/20"} />
        </div>
      )}
      {children}
    </div>
  );
}
