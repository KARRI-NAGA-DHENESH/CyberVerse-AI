import { motion } from "framer-motion";

type StatusCardProps = {
  title: string;
  value: string;
  color: string;
};

function StatusCard({ title, value, color }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-[#07111F] border border-cyan-500/20 p-6 shadow-lg"
    >
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2
        className="text-4xl font-bold mt-4"
        style={{ color }}
      >
        {value}
      </h2>
    </motion.div>
  );
}

export default StatusCard;