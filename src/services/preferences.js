const KEY = "app_prefs";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function save(prefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs));
}

export function createPreferencesService(defaults = {}) {
  let prefs = { ...defaults, ...load() };
  const listeners = new Set();

  function get(key) {
    return prefs[key] ?? defaults[key];
  }

  function set(key, value) {
    prefs = { ...prefs, [key]: value };
    save(prefs);
    listeners.forEach((fn) => fn({ key, value, prefs }));
  }

  function reset(key) {
    if (key) set(key, defaults[key]);
    else { prefs = { ...defaults }; save(prefs); listeners.forEach((fn) => fn({ prefs })); }
  }

  function getAll() {
    return { ...prefs };
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { get, set, reset, getAll, subscribe };
}
