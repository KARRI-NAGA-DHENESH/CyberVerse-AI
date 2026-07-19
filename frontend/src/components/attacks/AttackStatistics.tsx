import { useEffect, useState } from "react";

type Attack = {
  id: number;
  source: string;
  target: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: string;
  timestamp: string;
};

function AttackStatistics() {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/api/attacks`)
      .then((res) => res.json())
      .then((data) => {
        setAttacks(data.attacks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load statistics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">
        <h2 className="mb-6 text-2xl font-bold text-cyan-300">
          🌍 Live Attack Statistics
        </h2>

        <p className="text-gray-400">
          Loading statistics...
        </p>
      </div>
    );
  }

  const critical = attacks.filter(
    (a) => a.severity === "Critical"
  ).length;

  const countries = new Set(
    attacks.flatMap((a) => [a.source, a.target])
  );

  const frequency: Record<string, number> = {};

  attacks.forEach((a) => {
    frequency[a.type] = (frequency[a.type] || 0) + 1;
  });

  const mostCommon =
    Object.entries(frequency).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        🌍 Live Attack Statistics
      </h2>

      <div className="space-y-4">

        <Stat
          title="🔥 Active Attacks"
          value={attacks.length}
          color="text-red-400"
        />

        <Stat
          title="🚨 Critical Attacks"
          value={critical}
          color="text-orange-400"
        />

        <Stat
          title="🛡️ Countries Involved"
          value={countries.size}
          color="text-cyan-300"
        />

        <Stat
          title="⚡ Most Common Attack"
          value={mostCommon}
          color="text-yellow-400"
        />

      </div>

    </div>
  );
}

function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-[#0B1628] p-4">

      <p className="text-gray-400">
        {title}
      </p>

      <h3 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h3>

    </div>
  );
}

export default AttackStatistics;