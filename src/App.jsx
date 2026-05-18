import { useState, useCallback } from "react";
import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { uintCV, PostConditionMode } from "@stacks/transactions";

import { useWallet } from "./context/WalletContext";
import WalletConnect from "./components/WalletConnect";
import CardSelector from "./components/CardSelector";
import StakeInput from "./components/StakeInput";
import GameResult from "./components/GameResult";
import About from "./components/about/About";
import NetworkBadge from "./components/ui/NetworkBadge";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS ?? "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
const CONTRACT_NAME    = "card-game-v2";
const MIN_STAKE        = 1000;
const MAX_STAKE        = 1_000_000;
const NETWORK          = new StacksMainnet();

function StacksMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="14" height="3" rx="1.5" fill="currentColor"/>
      <rect x="3" y="11" width="10" height="3" rx="1.5" fill="currentColor"/>
    </svg>
  );
}

export default function App() {
  const { address, connect, disconnect } = useWallet();
  const [card, setCard]     = useState(null);
  const [stake, setStake]   = useState(0);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [txId, setTxId]     = useState(null);

  function handleDisconnect() {
    disconnect();
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
      onFinish: ({ txId: id }) => {
        setTxId(id);
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
      <header className="border-b border-white/5 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-stacks flex items-center"><StacksMark /></span>
          <span
            className="font-semibold text-white text-sm tracking-wide"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Card Game
          </span>
          <NetworkBadge />
        </div>
        <WalletConnect address={address} onConnect={connect} onDisconnect={handleDisconnect} />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[360px]">
          {status === "done" && result ? (
            <GameResult result={result} txId={txId} onReset={handleReset} />
          ) : (
            <div className="space-y-5">
              <div className="text-center space-y-1 mb-6">
                <h1
                  className="text-xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Pick your card
                </h1>
                <p className="text-xs text-white/30">
                  Match the contract's draw · win 2× your stake
                </p>
              </div>

              <div className="panel p-5 space-y-5">
                <CardSelector selected={card} onChange={setCard} disabled={status !== "idle"} />
                <div className="h-px bg-white/5" />
                <StakeInput value={stake} onChange={setStake} disabled={status !== "idle"} />
              </div>

              <button
                className="btn-primary"
                disabled={!canPlay}
                onClick={handlePlay}
              >
                {status === "pending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                    Confirming…
                  </span>
                ) : "Play"}
              </button>

              {!address && (
                <p className="text-center text-2xs text-white/20 mt-2">
                  Connect your Stacks wallet to play
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
