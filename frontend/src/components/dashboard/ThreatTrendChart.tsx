import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", threats: 18 },
  { day: "Tue", threats: 25 },
  { day: "Wed", threats: 14 },
  { day: "Thu", threats: 38 },
  { day: "Fri", threats: 30 },
  { day: "Sat", threats: 46 },
  { day: "Sun", threats: 34 },
];

function ThreatTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#081221] to-[#0B1628] p-6 shadow-[0_0_25px_rgba(0,229,255,.08)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,229,255,.18)]"
    >
      {/* Background Glow */}

      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

      <div className="relative z-10">

        <h2 className="mb-2 text-2xl font-bold text-cyan-300">
          📈 Weekly Threat Trend
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          AI monitored cyber attack activity over the last seven days.
        </p>

        <div className="h-[340px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="threatGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#00E5FF"
                    stopOpacity={0.9}
                  />

                  <stop
                    offset="95%"
                    stopColor="#00E5FF"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#123247"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="day"
                stroke="#8FAFC6"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#8FAFC6"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#081221",
                  border: "1px solid #22d3ee",
                  borderRadius: "14px",
                  color: "#ffffff",
                }}
              />

              <Area
                type="monotone"
                dataKey="threats"
                stroke="#00E5FF"
                strokeWidth={4}
                fill="url(#threatGradient)"
                animationDuration={1800}
                activeDot={{
                  r: 7,
                  fill: "#00E5FF",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </motion.div>
  );
}

export default ThreatTrendChart;