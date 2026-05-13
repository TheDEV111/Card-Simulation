import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      <Link
        to={ROUTES.GAME}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-surface font-bold text-sm shadow-gold-glow hover:bg-gold-light transition-colors duration-150 active:scale-[0.98]"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        <span>🃏</span>
        <span>Play now</span>
      </Link>
    </div>
  );
}
