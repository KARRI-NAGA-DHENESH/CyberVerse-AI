import { motion } from "framer-motion";

const stats = [
  {
    title: "Predictions Today",
    value: 1247,
    color: "text-cyan-400",
  },
  {
    title: "Average Accuracy",
    value: 98.2,
    suffix: "%",
    color: "text-green-400",
  },
  {
    title: "Response Time",
    value: 42,
    suffix: " ms",
    color: "text-yellow-400",
  },
  {
    title: "Active Models",
    value: 3,
    color: "text-red-400",
  },
];

function ModelStatistics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        📊 AI Model Statistics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.04,
              y: -5,
            }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-cyan-500/10 bg-[#0B1628] p-6 shadow-lg"
          >
            <p className="text-sm text-gray-400">
              {stat.title}
            </p>

            <motion.h3
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`mt-4 text-4xl font-bold ${stat.color}`}
            >
              {stat.value}
              {stat.suffix}
            </motion.h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ModelStatistics;