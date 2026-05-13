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
