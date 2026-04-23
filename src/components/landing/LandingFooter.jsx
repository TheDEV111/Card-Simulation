import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useContractInfo } from "../../hooks/useContractInfo";
import { explorerTxUrl } from "../../utils/stacks";

export default function LandingFooter({ className = "" }) {
  const contract = useContractInfo();

  return (
    <footer className={`border-t border-white/5 py-10 px-6 ${className}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-white/30">
          <Link to={ROUTES.HOME}        className="hover:text-white/60 transition-colors">Home</Link>
          <Link to={ROUTES.GAME}        className="hover:text-white/60 transition-colors">Play</Link>
          <Link to={ROUTES.LEADERBOARD} className="hover:text-white/60 transition-colors">Leaderboard</Link>
          <Link to={ROUTES.ABOUT}       className="hover:text-white/60 transition-colors">About</Link>
          <a
            href={explorerTxUrl(contract.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Smart contract ↗
          </a>
        </div>
        <p className="text-[10px] text-white/15 max-w-md leading-relaxed">
          Stacks Card Game is an on-chain game running on Stacks mainnet. Play responsibly.
          The house edge is 0%. Smart contract audits are available on request.
        </p>
      </div>
    </footer>
  );
}
