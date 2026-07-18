import { motion } from "framer-motion";

type Props = {
  x: number;
  y: number;
  label: string;
};

function CountryMarker({ x, y, label }: Props) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
      }}
      animate={{
        scale: [1, 1.3, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
    >
      <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#00E5FF]" />

      <p className="text-xs text-cyan-300 mt-2 whitespace-nowrap">
        {label}
      </p>
    </motion.div>
  );
}

export default CountryMarker;