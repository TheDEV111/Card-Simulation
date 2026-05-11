export function createTaskQueue({ concurrency = 1 } = {}) {
  const pending = [];
  let running = 0;

  function run() {
    while (running < concurrency && pending.length) {
      const { fn, resolve, reject } = pending.shift();
      running++;
      Promise.resolve()
        .then(fn)
        .then(resolve)
        .catch(reject)
        .finally(() => { running--; run(); });
    }
  }

  function enqueue(fn) {
    return new Promise((resolve, reject) => {
      pending.push({ fn, resolve, reject });
      run();
    });
  }

  function clear() {
    pending.length = 0;
  }

  function stats() {
    return { pending: pending.length, running };
  }

  return { enqueue, clear, stats };
}

export function createPriorityQueue({ concurrency = 1 } = {}) {
  const pending = [];
  let running = 0;

  function run() {
    while (running < concurrency && pending.length) {
      pending.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
      const { fn, resolve, reject } = pending.shift();
      running++;
      Promise.resolve()
        .then(fn)
        .then(resolve)
        .catch(reject)
        .finally(() => { running--; run(); });
    }
  }

  function enqueue(fn, priority = 0) {
    return new Promise((resolve, reject) => {
      pending.push({ fn, resolve, reject, priority });
      run();
    });
  }

  return { enqueue, stats: () => ({ pending: pending.length, running }) };
}
