import { useState } from "react";
import GameHeader from "../components/game/GameHeader";
import GameCardSelector from "../components/game/GameCardSelector";
import GameStakeInput from "../components/game/GameStakeInput";
import GamePlayButton from "../components/game/GamePlayButton";
import GameResultDisplay from "../components/game/GameResultDisplay";
import GameSidebar from "../components/game/GameSidebar";
import ConfirmPlayModal from "../components/ui/ConfirmPlayModal";
import ConnectWalletGate from "../components/ui/ConnectWalletGate";
import { useGamePlay } from "../hooks/useGamePlay";
import { MIN_STAKE_USTX, MAX_STAKE_USTX } from "../utils/constants";

export default function GamePage() {
  const [card, setCard] = useState(null);
  const [stake, setStake] = useState(10_000);
  const [showConfirm, setShowConfirm] = useState(false);
  const { play, loading, result, reset } = useGamePlay();

  const handlePlay = () => setShowConfirm(true);
  const handleConfirm = () => { setShowConfirm(false); play(card, stake); };
  const handlePlayAgain = () => { reset(); setCard(null); };

  return (
    <ConnectWalletGate>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <GameHeader />

        {result ? (
          <GameResultDisplay result={result} onPlayAgain={handlePlayAgain} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="panel p-6 space-y-6">
                <GameCardSelector selected={card} onChange={setCard} />
                <div className="h-px bg-white/5" />
                <GameStakeInput value={stake} onChange={setStake} />
                <GamePlayButton
                  card={card}
                  stake={stake}
                  loading={loading}
                  onClick={handlePlay}
                  disabled={!card}
                />
              </div>
            </div>
            <GameSidebar />
          </div>
        )}

        {showConfirm && (
          <ConfirmPlayModal
            card={card}
            stake={stake}
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </ConnectWalletGate>
  );
}
