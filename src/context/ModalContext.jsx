import { createContext, useContext, useState, useCallback, useId } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [stack, setStack] = useState([]);

  const push = useCallback((modal) => {
    const id = modal.id ?? Math.random().toString(36).slice(2);
    setStack((s) => [...s, { ...modal, id }]);
    return id;
  }, []);

  const pop = useCallback(() => setStack((s) => s.slice(0, -1)), []);

  const close = useCallback((id) => {
    setStack((s) => (id ? s.filter((m) => m.id !== id) : s.slice(0, -1)));
  }, []);

  const closeAll = useCallback(() => setStack([]), []);

  const current = stack[stack.length - 1] ?? null;

  return (
    <ModalContext.Provider value={{ stack, current, push, pop, close, closeAll }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal requires ModalProvider");
  return ctx;
}
