import { motion } from "framer-motion";

type AttackNodeProps = {
  x: number;
  y: number;
  color?: string;
};

function AttackNode({
  x,
  y,
  color = "#00E5FF",
}: AttackNodeProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: 14,
        height: 14,
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}`,
      }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
    />
  );
}

export default AttackNode;