export function animate(el, keyframes, options = {}) {
  if (!el?.animate) return Promise.resolve();
  return el.animate(keyframes, { duration: 300, easing: "ease-out", fill: "forwards", ...options }).finished;
}

export function fadeIn(el, duration = 200) {
  return animate(el, [{ opacity: 0 }, { opacity: 1 }], { duration });
}

export function fadeOut(el, duration = 200) {
  return animate(el, [{ opacity: 1 }, { opacity: 0 }], { duration });
}

export function slideIn(el, from = "top", distance = 20, duration = 250) {
  const axis = from === "left" || from === "right" ? "X" : "Y";
  const sign = from === "bottom" || from === "right" ? 1 : -1;
  const transform = `translate${axis}(${sign * distance}px)`;
  return animate(el, [{ opacity: 0, transform }, { opacity: 1, transform: "none" }], { duration });
}

export function popIn(el, duration = 200) {
  return animate(el, [{ opacity: 0, transform: "scale(0.9)" }, { opacity: 1, transform: "scale(1)" }], { duration, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" });
}

export function shake(el, duration = 400) {
  return animate(el, [
    { transform: "translateX(0)" },
    { transform: "translateX(-8px)" },
    { transform: "translateX(8px)" },
    { transform: "translateX(-4px)" },
    { transform: "translateX(0)" },
  ], { duration });
}
