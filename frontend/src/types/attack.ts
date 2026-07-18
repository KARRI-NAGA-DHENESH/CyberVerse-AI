export type AttackScenario = {
  id: number;
  name: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  source: string;
  target: string;
  description: string;
  mitigation: string;
};