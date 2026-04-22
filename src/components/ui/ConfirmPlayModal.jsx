import Modal from "./Modal";
import CardSymbol from "./CardSymbol";
import STXAmount from "./STXAmount";

export default function ConfirmPlayModal({ open, onClose, onConfirm, card, stake }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm your play">
      <div className="space-y-5">
        <div className="flex items-center justify-between px-4 py-3 bg-surface-overlay rounded-xl">
          <span className="text-sm text-white/50">Your card</span>
          <CardSymbol card={card} size="base" showName />
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-surface-overlay rounded-xl">
          <span className="text-sm text-white/50">Stake</span>
          <STXAmount microSTX={stake} />
        </div>
        <p className="text-xs text-white/30 text-center leading-relaxed">
          This will call the contract on Stacks mainnet. The outcome is final.
        </p>
        <div className="flex gap-3">
          <button className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button className="btn-primary flex-1" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </Modal>
  );
}
