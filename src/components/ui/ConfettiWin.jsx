import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const COLORS = ["#d4af37", "#34d399", "#f8fafc", "#fbbf24"];

export default function ConfettiWin({ active }) {
  const canvasRef = useRef(null);
  const reduced   = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const pieces = Array.from({ length: 80 }, () => ({
      x:  Math.random() * canvas.width,
      y:  -10 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      r:  Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      w:  6 + Math.random() * 6,
      h:  4 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        if (p.y > canvas.height * 0.7) p.alpha -= 0.015;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (pieces.some((p) => p.alpha > 0)) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
