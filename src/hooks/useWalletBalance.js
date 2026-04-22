import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";

export function useWalletBalance() {
  const { address } = useWallet();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) { setBalance(null); return; }
    setLoading(true);
    // Mock balance — real implementation would call Stacks API
    const mockBalance = 5_000_000 + Math.floor(Math.random() * 10_000_000);
    setTimeout(() => { setBalance(mockBalance); setLoading(false); }, 600);
  }, [address]);

  return { balance, loading, formatted: balance != null ? (balance / 1_000_000).toFixed(2) : null };
}
