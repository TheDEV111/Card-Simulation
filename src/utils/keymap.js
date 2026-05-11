const MOD = navigator.platform.includes("Mac") ? "metaKey" : "ctrlKey";

export function parseShortcut(shortcut) {
  const parts = shortcut.toLowerCase().split("+");
  return {
    key: parts[parts.length - 1],
    ctrl: parts.includes("ctrl"),
    meta: parts.includes("meta") || parts.includes("cmd"),
    shift: parts.includes("shift"),
    alt: parts.includes("alt"),
    mod: parts.includes("mod"),
  };
}

export function matchesShortcut(event, shortcut) {
  const s = typeof shortcut === "string" ? parseShortcut(shortcut) : shortcut;
  return (
    event.key.toLowerCase() === s.key &&
    (!s.ctrl || event.ctrlKey) &&
    (!s.meta || event.metaKey) &&
    (!s.shift || event.shiftKey) &&
    (!s.alt || event.altKey) &&
    (!s.mod || event[MOD])
  );
}

export function createKeymap(bindings) {
  return function handleKeyDown(event) {
    for (const [shortcut, handler] of Object.entries(bindings)) {
      if (matchesShortcut(event, shortcut)) {
        event.preventDefault();
        handler(event);
        return;
      }
    }
  };
}
