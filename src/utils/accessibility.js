export function srOnly(text) {
  return { className: "sr-only" };
}

export function ariaLabel(label) {
  return { "aria-label": label };
}

export function ariaLive(politeness = "polite") {
  return { "aria-live": politeness, "aria-atomic": "true" };
}

export function ariaExpanded(open) {
  return { "aria-expanded": open ? "true" : "false" };
}

export function ariaControls(id) {
  return { "aria-controls": id };
}

export function focusableProps(disabled = false) {
  return disabled
    ? { tabIndex: -1, "aria-disabled": "true" }
    : { tabIndex: 0 };
}

export function skipToId(id) {
  return { href: `#${id}` };
}
