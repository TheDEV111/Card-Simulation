import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Toasts from "../ui/Toast";
import Footer from "../Footer";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function AppLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { pathname } = useLocation();

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
    </div>
  );
}
