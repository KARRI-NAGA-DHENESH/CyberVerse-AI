import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import { CyberProvider } from "./context/CyberContext";
import { MetricsProvider } from "./context/SystemMetricsContext";
import { AlertProvider } from "./context/AlertContext";
import { AttackProvider } from "./context/AttackContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MetricsProvider>
      <CyberProvider>
        <AlertProvider>
          <AttackProvider>
            <App />
          </AttackProvider>
        </AlertProvider>
      </CyberProvider>
    </MetricsProvider>
  </StrictMode>
);