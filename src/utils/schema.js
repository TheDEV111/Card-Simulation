export function required(value, message = "Required") {
  return value !== undefined && value !== null && value !== "" ? null : message;
}

export function minLength(min, message) {
  return (value) =>
    String(value || "").length >= min ? null : (message ?? `Minimum ${min} characters`);
}

export function maxLength(max, message) {
  return (value) =>
    String(value || "").length <= max ? null : (message ?? `Maximum ${max} characters`);
}

export function pattern(regex, message = "Invalid format") {
  return (value) => (regex.test(value) ? null : message);
}

export function min(minimum, message) {
  return (value) => (Number(value) >= minimum ? null : (message ?? `Minimum value is ${minimum}`));
}

export function max(maximum, message) {
  return (value) => (Number(value) <= maximum ? null : (message ?? `Maximum value is ${maximum}`));
}

export function compose(...validators) {
  return (value) => {
    for (const v of validators) {
      const err = typeof v === "function" ? v(value) : required(value);
      if (err) return err;
    }
    return null;
  };
}

export function validateSchema(values, schema) {
  const errors = {};
  for (const [field, validator] of Object.entries(schema)) {
    const err = typeof validator === "function"
      ? validator(values[field])
      : required(values[field]);
    if (err) errors[field] = err;
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
}
