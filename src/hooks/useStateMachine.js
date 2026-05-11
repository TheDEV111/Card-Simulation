import { useState, useCallback, useRef } from "react";
import { createStateMachine } from "../services/stateMachine";

export function useStateMachine(config) {
  const machineRef = useRef(null);
  if (!machineRef.current) machineRef.current = createStateMachine(config);
  const machine = machineRef.current;

  const [state, setState] = useState(() => machine.getState());

  const send = useCallback((event) => {
    machine.send(event);
    setState(machine.getState());
  }, [machine]);

  return { state, send, matches: machine.matches };
}
