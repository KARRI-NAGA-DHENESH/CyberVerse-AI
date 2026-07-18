import { createContext, useContext, useState } from "react";
import type { Alert } from "../components/alerts/AlertCenter";

type AlertContextType = {
  selectedAlert: Alert | null;
  setSelectedAlert: (alert: Alert | null) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedAlert, setSelectedAlert] =
    useState<Alert | null>(null);

  return (
    <AlertContext.Provider
      value={{
        selectedAlert,
        setSelectedAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used inside AlertProvider");
  }

  return context;
}