import { motion } from "framer-motion";

const metrics = [
  {
    title: "CPU Usage",
    value: "32%",
    width: "32%",
    color: "bg-green-500",
  },
  {
    title: "Memory Usage",
    value: "61%",
    width: "61%",
    color: "bg-yellow-500",
  },
  {
    title: "Network Traffic",
    value: "420 Mbps",
    width: "84%",
    color: "bg-cyan-500",
  },
  {
    title: "API Response",
    value: "41 ms",
    width: "91%",
    color: "bg-purple-500",
  },
];

function SystemPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        ⚡ System Performance
      </h2>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.title}>
            <div className="mb-2 flex justify-between">
              <span className="text-white">{metric.title}</span>
              <span className="font-semibold text-cyan-300">
                {metric.value}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-[#16263a]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: metric.width }}
                transition={{ duration: 1 }}
                className={`h-full rounded-full ${metric.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default SystemPerformance;