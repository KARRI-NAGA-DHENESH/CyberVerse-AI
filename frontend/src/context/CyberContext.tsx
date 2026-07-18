import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

type Attack = {
  id: number;
  name: string;
  source: string;
  target: string;
  severity: string;
};

type CyberContextType = {
  selectedAttack: Attack | null;
  setSelectedAttack: (attack: Attack) => void;
};

const CyberContext = createContext<CyberContextType | null>(null);

export function CyberProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedAttack, setSelectedAttack] =
    useState<Attack | null>(null);

  return (
    <CyberContext.Provider
      value={{
        selectedAttack,
        setSelectedAttack,
      }}
    >
      {children}
    </CyberContext.Provider>
  );
}

export function useCyber() {
  const context = useContext(CyberContext);

  if (!context) {
    throw new Error(
      "useCyber must be used inside CyberProvider"
    );
  }

  return context;
}