import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Attack = {
  id: number;
  source: string;
  target: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: string;
  timestamp: string;
};

function LiveAttackFeed() {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [loading, setLoading] = useState(true);

  const severityColor = {
    Low: "text-green-400",
    Medium: "text-yellow-400",
    High: "text-orange-400",
    Critical: "text-red-400",
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/attacks")
      .then((res) => res.json())
      .then((data) => {
        setAttacks(data.attacks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load attacks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        🌍 Live Global Attack Feed
      </h2>

      {loading && (
        <p className="text-gray-400">
          Loading attack intelligence...
        </p>
      )}

      <div className="max-h-[500px] space-y-3 overflow-y-auto">

        <AnimatePresence>

          {attacks.map((attack) => (

            <motion.div
              key={attack.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-cyan-500/10 bg-[#0B1628] p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-white">
                    🌍 {attack.source} → {attack.target}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {attack.type}
                  </p>

                  <p className="mt-1 text-xs text-cyan-400">
                    {attack.status}
                  </p>

                </div>

                <span
                  className={`font-bold ${severityColor[attack.severity]}`}
                >
                  {attack.severity}
                </span>

              </div>

            </motion.div>

          ))}

        </AnimatePresence>

      </div>

    </div>
  );
}

export default LiveAttackFeed;