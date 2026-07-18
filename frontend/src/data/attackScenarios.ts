import type { AttackScenario } from "../types/attack";

export const attackScenarios: AttackScenario[] = [
  {
    id: 1,
    name: "SQL Injection",
    severity: "High",
    source: "USA",
    target: "India",
    description:
      "An attacker injects malicious SQL statements into application inputs to access or modify database information.",
    mitigation:
      "Use parameterized queries, validate input, and apply least-privilege database permissions.",
  },
  {
    id: 2,
    name: "DDoS Attack",
    severity: "Critical",
    source: "Germany",
    target: "Japan",
    description:
      "A large number of compromised systems flood a service with traffic, making it unavailable.",
    mitigation:
      "Use rate limiting, CDNs, traffic filtering, and DDoS protection services.",
  },
  {
    id: 3,
    name: "Phishing",
    severity: "Medium",
    source: "Brazil",
    target: "Australia",
    description:
      "Attackers trick users into revealing credentials through fake emails or websites.",
    mitigation:
      "Enable MFA, provide security awareness training, and use email filtering.",
  },
  {
    id: 4,
    name: "Brute Force",
    severity: "High",
    source: "Russia",
    target: "UK",
    description:
      "Repeated login attempts are used to guess passwords.",
    mitigation:
      "Enable account lockout, MFA, and strong password policies.",
  },
];