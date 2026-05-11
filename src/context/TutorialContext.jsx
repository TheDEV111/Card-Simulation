import { createContext, useContext, useState, useCallback } from "react";

const TutorialContext = createContext(null);

const STEPS_KEY = "tutorial_completed_steps";

function loadCompleted() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STEPS_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveCompleted(set) {
  localStorage.setItem(STEPS_KEY, JSON.stringify([...set]));
}

export function TutorialProvider({ steps = [], children }) {
  const [completed, setCompleted] = useState(loadCompleted);
  const [active, setActive] = useState(null);

  const start = useCallback(() => setActive(0), []);
  const next = useCallback(() => setActive((i) => (i < steps.length - 1 ? i + 1 : null)), [steps.length]);
  const skip = useCallback(() => setActive(null), []);

  const markDone = useCallback((stepId) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      saveCompleted(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setCompleted(new Set());
    saveCompleted(new Set());
  }, []);

  const currentStep = active !== null ? steps[active] : null;
  const isComplete = steps.every((s) => completed.has(s.id));

  return (
    <TutorialContext.Provider value={{ steps, active, currentStep, completed, isComplete, start, next, skip, markDone, resetAll }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error("useTutorial requires TutorialProvider");
  return ctx;
}
