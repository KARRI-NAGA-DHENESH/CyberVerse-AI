import { motion } from "framer-motion";

const systems = [
  {
    name: "Firewall",
    value: "Online",
    color: "text-green-400",
  },
  {
    name: "AI Engine",
    value: "Running",
    color: "text-cyan-400",
  },
  {
    name: "Database",
    value: "Healthy",
    color: "text-green-400",
  },
  {
    name: "Network",
    value: "Stable",
    color: "text-blue-400",
  },
  {
    name: "Cloud Sync",
    value: "Connected",
    color: "text-cyan-400",
  },
];

function SystemHealth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[#07111F] border border-cyan-500/20 p-6 h-full"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🖥️ System Health
      </h2>

      <div className="space-y-5">
        {systems.map((system, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.1,
            }}
            className="flex items-center justify-between border-b border-cyan-500/10 pb-3"
          >
            <span className="text-gray-300">
              {system.name}
            </span>

            <span className={`font-bold ${system.color}`}>
              {system.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SystemHealth;