export function template(str, vars) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

export function interpolate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

export function format(str, ...args) {
  let i = 0;
  return str.replace(/%s/g, () => args[i++] ?? "");
}

export function compile(template) {
  return (vars) => template.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

export function fillTemplate(template, data) {
  return template.replace(/\$\{(\w+)\}/g, (_, k) => data[k] ?? "");
}
