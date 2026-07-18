import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import NotificationCenter from "./components/notifications/NotificationCenter";

const SplashScreen = lazy(
  () => import("./pages/splash/SplashScreen")
);

const Login = lazy(
  () => import("./pages/Login/Login")
);

const Dashboard = lazy(
  () => import("./pages/Dashboard/Dashboard")
);

const ThreatLookup = lazy(
  () => import("./components/threatintel/ThreatLookup")
);

const MachineLearning = lazy(
  () => import("./pages/machinelearning/MachineLearning")
);

function App() {
  return (
    <BrowserRouter>

      {/* Global Notifications */}
      <NotificationCenter />

      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-[#020617]">
            <h1 className="animate-pulse text-3xl font-bold text-cyan-400">
              Loading CyberVerse AI...
            </h1>
          </div>
        }
      >

        <Routes>

          <Route
            path="/"
            element={<SplashScreen />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/machinelearning"
            element={<MachineLearning />}
          />

          <Route
            path="/threatlookup"
            element={<ThreatLookup />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;