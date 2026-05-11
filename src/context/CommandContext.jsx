import { createContext, useContext, useState, useCallback } from "react";

const CommandContext = createContext(null);

export function CommandProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [commands, setCommands] = useState([]);

  const registerCommands = useCallback((cmds) => {
    setCommands((prev) => {
      const ids = new Set(cmds.map((c) => c.id));
      return [...prev.filter((c) => !ids.has(c.id)), ...cmds];
    });
    return () => {
      setCommands((prev) => {
        const ids = new Set(cmds.map((c) => c.id));
        return prev.filter((c) => !ids.has(c.id));
      });
    };
  }, []);

  return (
    <CommandContext.Provider value={{ open, setOpen, commands, registerCommands }}>
      {children}
    </CommandContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error("useCommandPalette requires CommandProvider");
  return ctx;
}
