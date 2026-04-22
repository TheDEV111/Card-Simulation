import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Toasts from "../ui/Toast";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function AppLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex">
      {isMobile ? (
        <div className="flex-1 flex flex-col">
          <MobileNav />
          <main className="flex-1 px-4 py-6 animate-fade-in">
            <Outlet />
          </main>
        </div>
      ) : (
        <>
          <Sidebar />
          <main className="flex-1 px-8 py-8 min-h-screen animate-fade-in">
            <Outlet />
          </main>
        </>
      )}
      <Toasts />
    </div>
  );
}
