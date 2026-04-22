import { useRef, useState, useEffect } from "react";

export function useSpring(target, { stiffness = 180, damping = 20 } = {}) {
  const [value, setValue] = useState(target);
  const vel  = useRef(0);
  const curr = useRef(target);
  const raf  = useRef(null);

  useEffect(() => {
    const tick = () => {
      const dt = 1 / 60;
      const spring = -stiffness * (curr.current - target);
      const damp   = -damping * vel.current;
      vel.current  += (spring + damp) * dt;
      curr.current += vel.current * dt;

      if (Math.abs(curr.current - target) < 0.001 && Math.abs(vel.current) < 0.001) {
        curr.current = target;
        setValue(target);
        return;
      }

      setValue(curr.current);
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, stiffness, damping]);

  return value;
}
