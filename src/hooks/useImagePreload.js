import { useState, useEffect } from "react";

export function useImagePreload(srcs = []) {
  const [loaded, setLoaded] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!srcs.length) return;
    const imgs = srcs.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded((prev) => ({ ...prev, [src]: true }));
      img.onerror = () => setErrors((prev) => ({ ...prev, [src]: true }));
      return img;
    });
    return () => imgs.forEach((img) => { img.onload = null; img.onerror = null; });
  }, [srcs.join(",")]);

  const allLoaded = srcs.every((src) => loaded[src]);
  const anyError = srcs.some((src) => errors[src]);
  const progress = srcs.length ? Object.keys(loaded).length / srcs.length : 0;

  return { loaded, errors, allLoaded, anyError, progress };
}
