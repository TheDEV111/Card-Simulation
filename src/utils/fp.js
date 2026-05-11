export function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

export function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

export function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...more) => curried(...args, ...more);
  };
}

export function partial(fn, ...preArgs) {
  return (...args) => fn(...preArgs, ...args);
}

export function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}

export function noop() {}

export function identity(x) { return x; }

export function constant(x) { return () => x; }

export function not(fn) { return (...args) => !fn(...args); }

export function and(...fns) { return (x) => fns.every((fn) => fn(x)); }

export function or(...fns) { return (x) => fns.some((fn) => fn(x)); }
