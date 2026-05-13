import { createContext, useContext } from "react";
import { useSWUpdate } from "../hooks/useSWUpdate.js";

const UpdateContext = createContext(null);

export function UpdateProvider({ children, checkInterval }) {
  const update = useSWUpdate({ checkInterval });
  return <UpdateContext.Provider value={update}>{children}</UpdateContext.Provider>;
}

export function useUpdate() {
  const ctx = useContext(UpdateContext);
  if (!ctx) throw new Error("useUpdate must be used within UpdateProvider");
  return ctx;
}
