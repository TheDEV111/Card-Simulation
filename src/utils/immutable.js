export function setIn(obj, path, value) {
  const keys = typeof path === "string" ? path.split(".") : path;
  if (keys.length === 0) return value;
  const [head, ...rest] = keys;
  return {
    ...obj,
    [head]: rest.length > 0 ? setIn(obj?.[head] ?? {}, rest, value) : value,
  };
}

export function getIn(obj, path, fallback) {
  const keys = typeof path === "string" ? path.split(".") : path;
  let current = obj;
  for (const k of keys) {
    if (current == null) return fallback;
    current = current[k];
  }
  return current === undefined ? fallback : current;
}

export function deleteIn(obj, path) {
  const keys = typeof path === "string" ? path.split(".") : path;
  if (keys.length === 1) {
    const { [keys[0]]: _, ...rest } = obj;
    return rest;
  }
  const [head, ...rest] = keys;
  return { ...obj, [head]: deleteIn(obj[head], rest) };
}

export function updateIn(obj, path, updater) {
  return setIn(obj, path, updater(getIn(obj, path)));
}

export function mergeDeep(target, ...sources) {
  return sources.reduce((acc, src) => {
    for (const k in src) {
      if (src[k] && typeof src[k] === "object" && !Array.isArray(src[k])) {
        acc[k] = mergeDeep(acc[k] ?? {}, src[k]);
      } else {
        acc[k] = src[k];
      }
    }
    return { ...acc };
  }, { ...target });
}
