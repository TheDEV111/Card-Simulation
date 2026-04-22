import { createContext, useContext, useReducer, useCallback } from "react";

const GameContext = createContext(null);

const initialState = {
  card:    null,
  stake:   10_000,
  result:  null,
  loading: false,
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CARD":    return { ...state, card: action.payload };
    case "SET_STAKE":   return { ...state, stake: action.payload };
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_RESULT":  return { ...state, result: action.payload, loading: false,
                                  history: action.payload ? [action.payload, ...state.history].slice(0, 50) : state.history };
    case "RESET":       return { ...initialState, history: state.history };
    default:            return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setCard    = useCallback((c) => dispatch({ type: "SET_CARD",    payload: c }), []);
  const setStake   = useCallback((s) => dispatch({ type: "SET_STAKE",   payload: s }), []);
  const setResult  = useCallback((r) => dispatch({ type: "SET_RESULT",  payload: r }), []);
  const setLoading = useCallback((l) => dispatch({ type: "SET_LOADING", payload: l }), []);
  const reset      = useCallback(()  => dispatch({ type: "RESET" }), []);

  return (
    <GameContext.Provider value={{ ...state, setCard, setStake, setResult, setLoading, reset }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
