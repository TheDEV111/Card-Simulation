import { showConnect, AppConfig, UserSession } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

const APP_DETAILS = {
  name: "Stacks Card Game",
  icon: window.location.origin + "/favicon.ico",
};

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

function getSafeSession() {
  try {
    userSession.isUserSignedIn();
  } catch {
    // Stale or malformed session data — clear it so the modal can proceed
    userSession.store.deleteSessionData();
  }
  return userSession;
}

export default function WalletConnect({ address, onConnect, onDisconnect }) {
  function handleConnect() {
    showConnect({
      appDetails: APP_DETAILS,
      network: new StacksMainnet(),
      userSession: getSafeSession(),
      onFinish: ({ userSession: session }) => {
        const profile = session.loadUserData();
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
