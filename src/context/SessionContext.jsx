import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SessionContext = createContext(null);

const SESSION_KEY = "app_session";

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function SessionProvider({ children }) {
  const [data, setData] = useState(loadSession);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }, [data]);

  const set = useCallback((key, value) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);

  const remove = useCallback((key) => {
    setData((d) => {
      const next = { ...d };
      delete next[key];
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setData({});
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const get = useCallback((key) => data[key], [data]);

  return (
    <SessionContext.Provider value={{ data, get, set, remove, clear }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession requires SessionProvider");
  return ctx;
}
