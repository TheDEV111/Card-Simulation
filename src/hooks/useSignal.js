import { useState, useEffect } from "react";

export function useSignal(signal) {
  const [value, setValue] = useState(signal.get());
  useEffect(() => {
    setValue(signal.get());
    return signal.subscribe(setValue);
  }, [signal]);
  return value;
}

export function useSignalSetter(signal) {
  return signal.set;
}
