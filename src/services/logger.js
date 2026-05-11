const LEVELS = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };

export function createLogger({
  level = "info",
  prefix = "",
  handlers = [],
} = {}) {
  const minLevel = LEVELS[level] ?? 1;

  function log(lvl, ...args) {
    if (LEVELS[lvl] < minLevel) return;
    const entry = { level: lvl, timestamp: new Date().toISOString(), prefix, args };
    handlers.forEach((h) => h(entry));
    if (handlers.length === 0) {
      const method = console[lvl] ?? console.log;
      const tag = prefix ? `[${prefix}]` : "";
      method(tag, ...args);
    }
  }

  return {
    debug: (...args) => log("debug", ...args),
    info: (...args) => log("info", ...args),
    warn: (...args) => log("warn", ...args),
    error: (...args) => log("error", ...args),
    child: (childPrefix) =>
      createLogger({ level, prefix: prefix ? `${prefix}:${childPrefix}` : childPrefix, handlers }),
  };
}

export const logger = createLogger({
  level: import.meta.env?.MODE === "production" ? "warn" : "debug",
  prefix: "app",
});
