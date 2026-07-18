import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "SQL Injection", value: 34 },
  { name: "DDoS", value: 22 },
  { name: "Malware", value: 18 },
  { name: "Phishing", value: 12 },
  { name: "XSS", value: 8 },
  { name: "Botnet", value: 6 },
];

const COLORS = [
  "#ff3b30",
  "#ff9500",
  "#ffd60a",
  "#00E5FF",
  "#22c55e",
  "#8b5cf6",
];

function AttackDistribution() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#081221] to-[#0B1628] p-6 shadow-[0_0_25px_rgba(0,229,255,0.06)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(0,229,255,0.18)]"
    >
      {/* Background Glow */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

      <div className="relative z-10">

        <h2 className="mb-2 text-2xl font-bold text-cyan-300">
          🎯 Attack Distribution
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          Live distribution of detected cyber attacks.
        </p>

        <div className="h-[360px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={5}
                animationDuration={1500}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#081221",
                  border: "1px solid #22d3ee",
                  borderRadius: "14px",
                  color: "#ffffff",
                }}
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </motion.div>
  );
}

export default AttackDistribution;