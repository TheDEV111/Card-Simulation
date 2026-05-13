import { useState, useEffect, useRef } from "react";

export function useSpringValue(target, { stiffness = 120, damping = 14, mass = 1 } = {}) {
  const [value, setValue] = useState(target);
  const state = useRef({ value: target, velocity: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const run = () => {
      const { value: current, velocity } = state.current;
      const spring = -stiffness * (current - target);
      const damper = -damping * velocity;
      const acceleration = (spring + damper) / mass;
      const newVelocity = velocity + acceleration * 0.016;
      const newValue = current + newVelocity * 0.016;

      if (Math.abs(newValue - target) < 0.001 && Math.abs(newVelocity) < 0.001) {
        state.current = { value: target, velocity: 0 };
        setValue(target);
        return;
      }

      state.current = { value: newValue, velocity: newVelocity };
      setValue(newValue);
      rafRef.current = requestAnimationFrame(run);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, stiffness, damping, mass]);

  return value;
}
