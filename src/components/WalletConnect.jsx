import { showConnect } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";

const APP_DETAILS = {
  name: "Stacks Card Game",
  icon: window.location.origin + "/favicon.ico",
};

export default function WalletConnect({ address, onConnect, onDisconnect }) {
  function handleConnect() {
    showConnect({
      appDetails: APP_DETAILS,
      network: new StacksTestnet(),
      onFinish: ({ userSession }) => {
        const profile = userSession.loadUserData();
        onConnect(profile.profile.stxAddress.testnet);
      },
      onCancel: () => {},
    });
  }

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-overlay border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-sm text-white/70 font-mono">
            {address.slice(0, 6)}…{address.slice(-4)}
          </span>
        </div>
        <button className="btn-ghost" onClick={onDisconnect}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button className="btn-ghost" onClick={handleConnect}>
      Connect Wallet
    </button>
  );
}
