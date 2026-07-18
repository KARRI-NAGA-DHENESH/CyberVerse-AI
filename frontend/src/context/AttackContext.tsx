import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useCyber } from "./CyberContext";

import type { ReactNode } from "react";

export type Attack = {
  id: number;
  source: string;
  target: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
};

const countries = [
  "USA",
  "India",
  "China",
  "Russia",
  "Germany",
  "Japan",
  "Brazil",
  "Australia",
  "France",
  "Canada",
];

const attackTypes = [
  "DDoS",
  "Ransomware",
  "Malware",
  "Phishing",
  "SQL Injection",
  "XSS",
  "Botnet",
  "Brute Force",
];

const severities: Attack["severity"][] = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

const AttackContext = createContext<Attack[]>([]);

export function AttackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const { setSelectedAttack } = useCyber();

  useEffect(() => {
    const interval = setInterval(() => {
      const attack: Attack = {
        id: Date.now(),
        source:
          countries[Math.floor(Math.random() * countries.length)],
        target:
          countries[Math.floor(Math.random() * countries.length)],
        type:
          attackTypes[
            Math.floor(Math.random() * attackTypes.length)
          ],
        severity:
          severities[
            Math.floor(Math.random() * severities.length)
          ],
      };

      setAttacks((prev) => [attack, ...prev].slice(0, 20));

setSelectedAttack({
  id: attack.id,
  name: attack.type,
  source: attack.source,
  target: attack.target,
  severity: attack.severity,
});
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AttackContext.Provider value={attacks}>
      {children}
    </AttackContext.Provider>
  );
}

export function useAttacks() {
  return useContext(AttackContext);
}