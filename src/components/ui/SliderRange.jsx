import { useState, useRef, useCallback } from "react";
import { clamp } from "../../utils/math";

export default function SliderRange({ min = 0, max = 100, value = [20, 80], onChange, className = "" }) {
  const [vals, setVals] = useState(value);
  const trackRef = useRef(null);

  const getPercent = (v) => ((v - min) / (max - min)) * 100;

  const handleChange = useCallback((index, newVal) => {
    setVals((prev) => {
      const next = [...prev];
      next[index] = clamp(newVal, index === 0 ? min : prev[0] + 1, index === 1 ? max : prev[1] - 1);
      onChange?.(next);
      return next;
    });
  }, [min, max, onChange]);

  const lo = getPercent(vals[0]);
  const hi = getPercent(vals[1]);

  return (
    <div className={`relative h-5 ${className}`} ref={trackRef}>
      <div className="absolute inset-y-0 flex items-center w-full">
        <div className="relative w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute h-full rounded-full bg-indigo-500"
            style={{ left: `${lo}%`, width: `${hi - lo}%` }}
          />
        </div>
      </div>
      {[0, 1].map((i) => (
        <input
          key={i}
          type="range"
          min={min}
          max={max}
          value={vals[i]}
          onChange={(e) => handleChange(i, Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-indigo-500"
          style={{ zIndex: i === 0 && vals[0] === max ? 5 : 4 + i }}
        />
      ))}
    </div>
  );
}
