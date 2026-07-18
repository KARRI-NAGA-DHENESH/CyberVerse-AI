import { motion, AnimatePresence } from "framer-motion";
import { useCyber } from "../../context/CyberContext";

function SOCAlert() {
  const { selectedAttack } = useCyber();

  if (!selectedAttack) return null;

  const severityColor =
    selectedAttack.severity === "Critical"
      ? "border-red-500 text-red-400"
      : selectedAttack.severity === "High"
      ? "border-orange-500 text-orange-400"
      : selectedAttack.severity === "Medium"
      ? "border-yellow-500 text-yellow-300"
      : "border-green-500 text-green-400";

  return (
    <AnimatePresence>
      <motion.div
        key={selectedAttack.id}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`rounded-2xl border ${severityColor} bg-[#07111F] p-5 shadow-lg`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              🚨 SOC ALERT
            </h2>

            <p className="mt-2 text-white">
              {selectedAttack.name}
            </p>

            <p className="text-gray-400 mt-1">
              {selectedAttack.source} → {selectedAttack.target}
            </p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
            className="text-5xl"
          >
            ⚠️
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SOCAlert;