import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Toasts from "../ui/Toast";
import Footer from "../Footer";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PWAInstallPrompt } from "../pwa/PWAInstallPrompt.jsx";
import { UpdateBanner } from "../pwa/UpdateBanner.jsx";
import { UpdateToast } from "../pwa/UpdateToast.jsx";
import { PWADrawer } from "../pwa/PWADrawer.jsx";
import { PWAErrorBoundary } from "../pwa/PWAErrorBoundary.jsx";

export default function AppLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex">
      <UpdateBanner />
      {isMobile ? (
        <div className="flex-1 flex flex-col">
          <MobileNav />
          <main className="flex-1 px-4 py-6 animate-fade-in">
            <Outlet />
          </main>
          <Footer />
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <main className="flex-1 px-8 py-8 animate-fade-in">
              <Outlet />
            </main>
            <Footer />
          </div>
        </>
      )}
      <Toasts />
      <PWAInstallPrompt />
      <UpdateToast />
      <PWAErrorBoundary>
        <PWADrawer />
      </PWAErrorBoundary>
    </div>
  );
}
