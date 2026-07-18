import { useEffect, useState } from "react";
import { useCyber } from "../../context/CyberContext";

function CyberTerminal() {
  const { selectedAttack } = useCyber();

  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] CyberVerse SOC Initialized...",
    "[SYSTEM] Monitoring global network...",
  ]);

  useEffect(() => {
    if (!selectedAttack) return;

    const newLogs = [
      `> Threat Detected: ${selectedAttack.name}`,
      `> Source: ${selectedAttack.source}`,
      `> Target: ${selectedAttack.target}`,
      `> Severity: ${selectedAttack.severity}`,
      "> Running AI Analysis...",
      "> Deploying Countermeasures...",
      "> Threat Neutralized ✓",
    ];

    let index = 0;

    const interval = setInterval(() => {
      if (index < newLogs.length) {
        setLogs((prev) => [...prev, newLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [selectedAttack]);

  return (
    <div className="rounded-2xl border border-green-500/30 bg-black p-6 font-mono">
      <h2 className="mb-4 text-2xl font-bold text-green-400">
        💻 Cyber Terminal
      </h2>

      <div className="h-72 overflow-y-auto rounded-lg bg-[#050505] p-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="mb-2 text-green-400"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CyberTerminal;