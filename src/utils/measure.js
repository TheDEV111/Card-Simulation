export function getRect(el) {
  return el?.getBoundingClientRect() ?? null;
}

export function getOffset(el) {
  if (!el) return { top: 0, left: 0 };
  let top = 0;
  let left = 0;
  let current = el;
  while (current) {
    top += current.offsetTop;
    left += current.offsetLeft;
    current = current.offsetParent;
  }
  return { top, left };
}

export function isOverflowing(el, axis = "both") {
  if (!el) return false;
  const { scrollWidth, scrollHeight, clientWidth, clientHeight } = el;
  if (axis === "x") return scrollWidth > clientWidth;
  if (axis === "y") return scrollHeight > clientHeight;
  return scrollWidth > clientWidth || scrollHeight > clientHeight;
}

export function getScrollParent(el) {
  let parent = el?.parentElement;
  while (parent) {
    const { overflow, overflowX, overflowY } = getComputedStyle(parent);
    if (/auto|scroll/.test(overflow + overflowX + overflowY)) return parent;
    parent = parent.parentElement;
  }
  return document.scrollingElement ?? document.documentElement;
}

export function scrollIntoView(el, options = { behavior: "smooth", block: "nearest" }) {
  el?.scrollIntoView(options);
}
