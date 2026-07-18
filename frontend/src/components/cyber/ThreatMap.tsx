import { motion } from "framer-motion";

const nodes = [
  { top: "18%", left: "22%" },
  { top: "30%", left: "48%" },
  { top: "24%", left: "72%" },
  { top: "56%", left: "28%" },
  { top: "66%", left: "58%" },
  { top: "48%", left: "80%" },
];

const lines = [
  { x1: "22%", y1: "18%", x2: "48%", y2: "30%" },
  { x1: "48%", y1: "30%", x2: "72%", y2: "24%" },
  { x1: "22%", y1: "18%", x2: "28%", y2: "56%" },
  { x1: "48%", y1: "30%", x2: "58%", y2: "66%" },
  { x1: "72%", y1: "24%", x2: "80%", y2: "48%" },
  { x1: "28%", y1: "56%", x2: "58%", y2: "66%" },
];

function ThreatMap() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#050C18]">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#00E5FF"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Animated Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: index * 0.3,
          }}
          className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#00E5FF]"
          style={{
            top: node.top,
            left: node.left,
          }}
        />
      ))}

      {/* Radar Sweep */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"
      >
        <div
          className="absolute left-1/2 top-1/2 h-1/2 w-[2px] origin-bottom -translate-x-1/2 bg-gradient-to-t from-cyan-400 to-transparent"
        />
      </motion.div>
    </div>
  );
}

export default ThreatMap;