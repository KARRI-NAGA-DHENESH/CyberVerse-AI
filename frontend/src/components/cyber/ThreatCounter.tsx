import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function ThreatCounter() {
  const [count, setCount] = useState(2483);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-5 right-5 rounded-xl border border-red-500/20 bg-[#07111F]/90 backdrop-blur-md p-4"
    >
      <p className="text-gray-400 text-sm">
        Today's Attacks
      </p>

      <motion.h2
        key={count}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-red-400"
      >
        {count.toLocaleString()}
      </motion.h2>

      <p className="text-green-400 text-sm mt-2">
        ▲ Live Monitoring
      </p>
    </motion.div>
  );
}

export default ThreatCounter;