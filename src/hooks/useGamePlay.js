import { useState, useCallback } from "react";
import { useToast } from "../context/ToastContext";
import { MOCK_GAMES } from "../utils/mockData";

export function useGamePlay() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const play = useCallback(async (card, stake) => {
    if (!card || !stake) return;
    setLoading(true);
    setResult(null);

    try {
      await new Promise((r) => setTimeout(r, 1800));

      const contractCard = Math.ceil(Math.random() * 3);
      const outcome = contractCard === card ? "win" : "loss";
      const payout = outcome === "win" ? stake * 3 : 0;

      const mockResult = {
        txId: `0x${Math.random().toString(16).slice(2, 18)}`,
        outcome,
        card,
        contractCard,
        stake,
        payout,
        timestamp: Date.now(),
      };

      setResult(mockResult);
      toast(
        outcome === "win"
          ? `You won! +${(payout / 1_000_000).toFixed(2)} STX`
          : "Better luck next time.",
        outcome === "win" ? "success" : "error"
      );
    } catch (err) {
      toast("Transaction failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const reset = useCallback(() => setResult(null), []);

  return { play, loading, result, reset };
}
