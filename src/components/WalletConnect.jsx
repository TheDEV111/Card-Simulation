import { showConnect, AppConfig, UserSession } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

const APP_DETAILS = {
  name: "Stacks Card Game",
  icon: window.location.origin + "/favicon.ico",
};

const appConfig   = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

function getSafeSession() {
  try {
    userSession.isUserSignedIn();
  } catch {
    userSession.store.deleteSessionData();
  }
  return userSession;
}

function WalletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1 6h12" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="10" cy="9" r="1" fill="currentColor"/>
    </svg>
  );
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
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-overlay border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-stacks shrink-0" />
          <span className="text-xs text-white/60 font-mono">
            {address.slice(0, 6)}…{address.slice(-4)}
          </span>
        </div>
        <button className="btn-ghost py-1.5 text-xs" onClick={onDisconnect}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stacks/30 text-stacks text-sm font-medium hover:bg-stacks/8 hover:border-stacks/50 transition-all duration-150"
      onClick={handleConnect}
    >
      <WalletIcon />
      Connect
    </button>
  );
}
