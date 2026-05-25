export function createSyncEngine({ push, pull, interval = 30_000 } = {}) {
  let running = false;
  let lastSync = null;
  let timerId = null;
  const listeners = new Set();

  function notify(event, data) {
    listeners.forEach((fn) => fn({ event, ...data, lastSync }));
  }

  async function doSync() {
    if (!push && !pull) return;
    notify("start", {});
    try {
      if (pull) await pull();
      if (push) await push();
      lastSync = new Date();
      notify("success", { lastSync });
    } catch (err) {
      notify("error", { error: err });
    }
  }

  function start() {
    if (running) return;
    running = true;
    doSync();
    timerId = setInterval(doSync, interval);
  }

  function stop() {
    running = false;
    clearInterval(timerId);
  }

  function forceSync() {
    return doSync();
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { start, stop, forceSync, subscribe, getLastSync: () => lastSync };
}
