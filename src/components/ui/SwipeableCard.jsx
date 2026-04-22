import { useRef, useState } from "react";

export default function SwipeableCard({ onSwipeLeft, onSwipeRight, threshold = 80, children, className = "" }) {
  const startX = useRef(null);
  const [deltaX, setDeltaX] = useState(0);
  const [swiped, setSwiped] = useState(false);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e) => {
    if (startX.current === null) return;
    setDeltaX(e.touches[0].clientX - startX.current);
  };
  const handleTouchEnd   = () => {
    if (deltaX > threshold) { setSwiped(true); onSwipeRight?.(); }
    else if (deltaX < -threshold) { setSwiped(true); onSwipeLeft?.(); }
    setDeltaX(0);
    startX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`transition-transform duration-75 ${swiped ? "opacity-0 pointer-events-none" : ""} ${className}`}
      style={{ transform: `translateX(${deltaX}px)` }}
    >
      {children}
    </div>
  );
}
