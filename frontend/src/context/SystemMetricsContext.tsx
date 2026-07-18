import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";

type Metrics = {
  cpu: number;
  memory: number;
  traffic: number;
  threats: number;
  alerts: number;
};

const MetricsContext = createContext<Metrics | null>(null);

export function MetricsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [metrics, setMetrics] = useState<Metrics>({
    cpu: 42,
    memory: 58,
    traffic: 120,
    threats: 8,
    alerts: 15,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 45,
        traffic: Math.floor(Math.random() * 400) + 100,
        threats: Math.floor(Math.random() * 30),
        alerts: Math.floor(Math.random() * 60),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MetricsContext.Provider value={metrics}>
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetrics() {
  const context = useContext(MetricsContext);

  if (!context) {
    throw new Error(
      "useMetrics must be used within MetricsProvider"
    );
  }

  return context;
}