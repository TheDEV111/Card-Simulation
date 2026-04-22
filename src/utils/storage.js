export function getLS(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function setLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function removeLS(key) {
  try { localStorage.removeItem(key); return true; }
  catch { return false; }
}

export function getSS(key, fallback = null) {
  try {
    const v = sessionStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function setSS(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
