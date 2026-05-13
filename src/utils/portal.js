export function getOrCreatePortal(id = "portal-root") {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}

export function removePortal(id = "portal-root") {
  const el = document.getElementById(id);
  if (el) document.body.removeChild(el);
}

export function createLayeredPortal(zIndex = 50) {
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.inset = "0";
  el.style.zIndex = String(zIndex);
  el.style.pointerEvents = "none";
  document.body.appendChild(el);
  return {
    el,
    remove() { document.body.removeChild(el); },
  };
}
