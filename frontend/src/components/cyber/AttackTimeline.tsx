import { useEffect, useState } from "react";
import { useCyber } from "../../context/CyberContext";

type TimelineItem = {
  id: number;
  time: string;
  attack: string;
  source: string;
  target: string;
  severity: string;
};

function AttackTimeline() {
  const { selectedAttack } = useCyber();

  const [items, setItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    if (!selectedAttack) return;

    const now = new Date().toLocaleTimeString();

    setItems((prev) => [
      {
        id: Date.now(),
        time: now,
        attack: selectedAttack.name,
        source: selectedAttack.source,
        target: selectedAttack.target,
        severity: selectedAttack.severity,
      },
      ...prev,
    ]);
  }, [selectedAttack]);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📜 Attack Timeline
      </h2>

      <div className="max-h-96 space-y-4 overflow-y-auto">

        {items.length === 0 && (
          <p className="text-gray-500">
            No attacks launched yet.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#0B1628] p-4"
          >
            <div className="flex justify-between">

              <h3 className="font-semibold text-white">
                {item.attack}
              </h3>

              <span className="text-cyan-400">
                {item.time}
              </span>

            </div>

            <p className="mt-2 text-gray-400">
              {item.source} → {item.target}
            </p>

            <p
              className={`mt-2 font-semibold ${
                item.severity === "Critical"
                  ? "text-red-500"
                  : item.severity === "High"
                  ? "text-orange-400"
                  : item.severity === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {item.severity}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AttackTimeline;