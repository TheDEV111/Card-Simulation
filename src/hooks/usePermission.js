import { useState, useEffect } from "react";

export function usePermission(name) {
  const [state, setState] = useState("prompt");

  useEffect(() => {
    if (!navigator.permissions) return;
    let permStatus;
    navigator.permissions.query({ name }).then((status) => {
      permStatus = status;
      setState(status.state);
      const handler = () => setState(status.state);
      status.addEventListener("change", handler);
    }).catch(() => setState("unsupported"));
    return () => permStatus?.removeEventListener("change", () => {});
  }, [name]);

  return state;
}
