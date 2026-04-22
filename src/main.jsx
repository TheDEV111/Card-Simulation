import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { WalletProvider }  from "./context/WalletContext";
import { ToastProvider }   from "./context/ToastContext";
import AppLayout           from "./components/layout/AppLayout";

import LandingPage      from "./pages/LandingPage";
import GamePage         from "./pages/GamePage";
import DashboardPage    from "./pages/DashboardPage";
import HistoryPage      from "./pages/HistoryPage";
import LeaderboardPage  from "./pages/LeaderboardPage";
import ProfilePage      from "./pages/ProfilePage";
import HowToPlayPage    from "./pages/HowToPlayPage";
import RewardsPage      from "./pages/RewardsPage";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage     from "./pages/SettingsPage";
import NotFoundPage     from "./pages/NotFoundPage";
import { ROUTES }       from "./utils/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.HOME}         element={<LandingPage />} />
              <Route path={ROUTES.GAME}         element={<GamePage />} />
              <Route path={ROUTES.DASHBOARD}    element={<DashboardPage />} />
              <Route path={ROUTES.HISTORY}      element={<HistoryPage />} />
              <Route path={ROUTES.LEADERBOARD}  element={<LeaderboardPage />} />
              <Route path={ROUTES.PROFILE}      element={<ProfilePage />} />
              <Route path={ROUTES.HOW_TO_PLAY}  element={<HowToPlayPage />} />
              <Route path={ROUTES.REWARDS}      element={<RewardsPage />} />
              <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
              <Route path={ROUTES.SETTINGS}     element={<SettingsPage />} />
              <Route path={ROUTES.NOT_FOUND}    element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </WalletProvider>
  </StrictMode>
);
