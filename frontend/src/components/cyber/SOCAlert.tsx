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
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedAttack.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl border ${severityColor} bg-[#07111F] p-5 shadow-lg min-h-[120px]`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              🚨 SOC ALERT
            </h2>

            <p className="mt-2 text-white">
              {selectedAttack.name}
            </p>

            <p className="mt-1 text-gray-400">
              {selectedAttack.source} → {selectedAttack.target}
            </p>
          </div>

          <div className="text-5xl">
            ⚠️
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SOCAlert;