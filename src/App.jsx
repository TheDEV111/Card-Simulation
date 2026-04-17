import { useState, useCallback } from "react";
import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { uintCV, PostConditionMode } from "@stacks/transactions";

import WalletConnect from "./components/WalletConnect";
import CardSelector from "./components/CardSelector";
import StakeInput from "./components/StakeInput";
import GameResult from "./components/GameResult";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS ?? "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
const CONTRACT_NAME = "card-game";
const MIN_STAKE = 1000;
const MAX_STAKE = 1_000_000;
const NETWORK = new StacksMainnet();

export default function App() {
  const [address, setAddress] = useState(null);
  const [card, setCard] = useState(null);
  const [stake, setStake] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | pending | done
  const [result, setResult] = useState(null);
  const [txId, setTxId] = useState(null);

  function handleDisconnect() {
    setAddress(null);
    setCard(null);
    setStake(0);
    setStatus("idle");
    setResult(null);
  }

  const canPlay =
    address &&
    card !== null &&
    stake >= MIN_STAKE &&
    stake <= MAX_STAKE &&
    status === "idle";

  const handlePlay = useCallback(async () => {
    if (!canPlay) return;
    setStatus("pending");

    await openContractCall({
      network: NETWORK,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "play",
      functionArgs: [uintCV(card), uintCV(stake)],
      postConditionMode: PostConditionMode.Allow,
      appDetails: { name: "Stacks Card Game", icon: window.location.origin + "/favicon.ico" },
      onFinish: ({ txId: id, txRaw }) => {
        setTxId(id);
        // Derive a deterministic mock result from txId for demo purposes.
        // In production, poll the API for the actual contract event.
        const contractCard = (parseInt(id.slice(-2), 16) % 3) + 1;
        const isWin = contractCard === card;
        setResult({
          outcome: isWin ? "win" : "loss",
          card,
          contractCard,
          stake,
          payout: isWin ? stake * 2 : 0,
        });
        setStatus("done");
      },
      onCancel: () => setStatus("idle"),
    });
  }, [canPlay, card, stake]);

  function handleReset() {
    setCard(null);
    setStake(0);
    setStatus("idle");
    setResult(null);
    setTxId(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🃏</span>
          <span className="font-semibold text-white tracking-tight">
            Stacks Card Game
          </span>
        </div>
        <WalletConnect
          address={address}
          onConnect={setAddress}
          onDisconnect={handleDisconnect}
        />
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          {status === "done" && result ? (
            <GameResult result={result} txId={txId} onReset={handleReset} />
          ) : (
            <>
              {/* Hero */}
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Pick your card
                </h1>
                <p className="text-sm text-white/40">
                  Match the contract's draw to win 2× your stake
                </p>
              </div>

              {/* Game panel */}
              <div className="bg-surface-raised rounded-3xl p-6 space-y-6 shadow-card">
                <CardSelector
                  selected={card}
                  onChange={setCard}
                  disabled={status !== "idle"}
                />

                <StakeInput
                  value={stake}
                  onChange={setStake}
                  disabled={status !== "idle"}
                />

                <button
                  className="btn-primary"
                  disabled={!canPlay}
                  onClick={handlePlay}
                >
                  {status === "pending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-surface/40 border-t-surface rounded-full animate-spin" />
                      Confirming…
                    </span>
                  ) : (
                    "Play"
                  )}
                </button>

                {!address && (
                  <p className="text-center text-xs text-white/30">
                    Connect your Stacks wallet to play
                  </p>
                )}
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Min Stake", value: "0.001 STX" },
                  { label: "Max Stake", value: "1 STX" },
                  { label: "Win Payout", value: "2×" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-surface-raised rounded-xl px-3 py-3 border border-white/5"
                  >
                    <p className="text-xs text-white/30 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-gold">{value}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
