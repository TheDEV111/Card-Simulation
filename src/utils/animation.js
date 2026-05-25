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

export const EASING = {
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  snappy: "cubic-bezier(0.4, 0, 0.2, 1)",
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

export function staggerDelay(index, base = 60) {
  return `${index * base}ms`;
}

export function fadeInUpStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.4s ${EASING.expo} ${delay}ms, transform 0.4s ${EASING.expo} ${delay}ms`,
  };
}

export function fadeInStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transition: `opacity 0.35s ${EASING.gentle} ${delay}ms`,
  };
}
