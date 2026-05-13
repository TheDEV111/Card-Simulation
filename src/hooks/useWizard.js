import { useState, useCallback } from "react";

export function useWizard(steps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [completed, setCompleted] = useState(new Set());

  const next = useCallback((values = {}) => {
    setData((d) => ({ ...d, ...values }));
    setCompleted((c) => new Set([...c, step]));
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }, [step, steps.length]);

  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const goTo = useCallback((i) => setStep(Math.max(0, Math.min(i, steps.length - 1))), [steps.length]);
  const reset = useCallback(() => { setStep(0); setData({}); setCompleted(new Set()); }, []);

  return {
    step, steps, currentStep: steps[step],
    data, completed,
    isFirst: step === 0, isLast: step === steps.length - 1,
    progress: Math.round((completed.size / steps.length) * 100),
    next, back, goTo, reset,
  };
}
