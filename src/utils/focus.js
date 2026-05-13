const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusable(container) {
  return Array.from((container ?? document).querySelectorAll(FOCUSABLE));
}

export function getFirstFocusable(container) {
  return getFocusable(container)[0] ?? null;
}

export function getLastFocusable(container) {
  const els = getFocusable(container);
  return els[els.length - 1] ?? null;
}

export function focusFirst(container) {
  getFirstFocusable(container)?.focus();
}

export function focusLast(container) {
  getLastFocusable(container)?.focus();
}

export function saveFocus() {
  return document.activeElement;
}

export function restoreFocus(el) {
  if (el && document.contains(el)) el.focus();
}

export function trapFocus(container, event) {
  const focusable = getFocusable(container);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
