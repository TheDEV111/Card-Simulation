import { PWAProvider } from "./PWAContext.jsx";
import { NetworkProvider } from "./NetworkContext.jsx";
import { InstallProvider } from "./InstallContext.jsx";
import { UpdateProvider } from "./UpdateContext.jsx";

export function PWARoot({ children, pingInterval, updateCheckInterval }) {
  return (
    <NetworkProvider pingInterval={pingInterval}>
      <InstallProvider>
        <UpdateProvider checkInterval={updateCheckInterval}>
          <PWAProvider>
            {children}
          </PWAProvider>
        </UpdateProvider>
      </InstallProvider>
    </NetworkProvider>
  );
}
