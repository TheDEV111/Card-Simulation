export const easing = {
  expo:    "cubic-bezier(0.16, 1, 0.3, 1)",
  spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
  smooth:  "cubic-bezier(0.4, 0, 0.2, 1)",
  snappy:  "cubic-bezier(0.2, 0, 0, 1)",
  linear:  "linear",
};

export function cssTransition(props, duration = 300, ease = easing.smooth, delay = 0) {
  return props
    .map((p) => `${p} ${duration}ms ${ease} ${delay}ms`)
    .join(", ");
}

export function staggerStyle(i, base = 60, duration = 500, ease = easing.expo) {
  return {
    opacity:    1,
    transform:  "none",
    transition: `opacity ${duration}ms ${ease} ${i * base}ms, transform ${duration}ms ${ease} ${i * base}ms`,
  };
}
