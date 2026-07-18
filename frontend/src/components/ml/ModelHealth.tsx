import { motion } from "framer-motion";

const services = [
  {
    name: "Phishing Detector",
    status: "Online",
  },
  {
    name: "Intrusion Detector",
    status: "Online",
  },
  {
    name: "Malware Classifier",
    status: "Online",
  },
  {
    name: "Python ML Server",
    status: "Running",
  },
  {
    name: "Backend API",
    status: "Connected",
  },
];

function ModelHealth() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        🤖 AI Model Health
      </h2>

      <div className="space-y-4">
        {services.map((service) => (
          <motion.div
            key={service.name}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between rounded-xl border border-cyan-500/10 bg-[#0B1628] p-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-white font-medium">
                {service.name}
              </span>
            </div>

            <span className="font-semibold text-green-400">
              {service.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ModelHealth;