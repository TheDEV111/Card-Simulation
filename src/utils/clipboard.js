export async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(el);
  el.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(el);
  return ok;
}

export async function readFromClipboard() {
  if (navigator.clipboard?.readText) {
    return navigator.clipboard.readText();
  }
  return null;
}

export function useCopyFeedback(duration = 1500) {
  let timer = null;
  return async function copy(text, onCopied) {
    const ok = await copyToClipboard(text);
    if (ok && onCopied) {
      onCopied(true);
      clearTimeout(timer);
      timer = setTimeout(() => onCopied(false), duration);
    }
    return ok;
  };
}
