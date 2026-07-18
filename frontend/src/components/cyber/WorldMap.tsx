import { motion } from "framer-motion";
import { useState } from "react";
import worldMap from "../../assets/maps/world.svg";
import Radar from "./Radar";
import CountryMarker from "./CountryMarker";
import ThreatCounter from "./ThreatCounter";
import { useCyber } from "../../context/CyberContext";
import { useAttacks } from "../../context/AttackContext";
const countries = [
  { x: 170, y: 180, label: "USA" },
  { x: 700, y: 220, label: "India" },
  { x: 430, y: 140, label: "Germany" },
  { x: 790, y: 170, label: "Japan" },
  { x: 620, y: 180, label: "UAE" },
  { x: 520, y: 165, label: "UK" },
  { x: 320, y: 250, label: "Brazil" },
  { x: 845, y: 300, label: "Australia" },
  { x: 610, y: 120, label: "Russia" },
  { x: 520, y: 250, label: "South Africa" },
  { x: 250, y: 150, label: "Canada" },
  { x: 760, y: 260, label: "Singapore" },
];
const liveRoutes = [
  "M170 180 Q430 60 700 220",
  "M430 140 Q620 40 790 170",
  "M250 150 Q520 90 760 260",
  "M610 120 Q520 150 320 250",
  "M845 300 Q700 180 520 165",
  "M520 250 Q430 170 170 180",
  "M620 180 Q710 120 845 300",
  "M790 170 Q600 80 250 150",
];

function WorldMap() {
  const { selectedAttack } = useCyber();
  const attacks = useAttacks();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const isSQL = selectedAttack?.name === "SQL Injection";
  const isDDoS = selectedAttack?.name === "DDoS Attack";
  const activeCountries =
  isSQL
    ? ["USA", "India"]
    : isDDoS
    ? ["Germany", "Japan"]
    : [];
    const attackColor = isSQL
  ? "#FF3B30"
  : isDDoS
  ? "#FFD60A"
  : "#00E5FF";

const attackGlow = isSQL
  ? "rgba(255,59,48,.9)"
  : isDDoS
  ? "rgba(255,214,10,.9)"
  : "rgba(0,229,255,.9)";
  const latestAttack = attacks[0];

const liveAttackText = latestAttack
  ? `${latestAttack.source} → ${latestAttack.target} • ${latestAttack.type}`
  : "Monitoring Worldwide Cyber Threats";

  return (
    <div className="relative h-[540px] overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#020817] shadow-[0_0_80px_rgba(0,229,255,.18)]">

      {/* Animated Background */}

      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: [
            "0% 0%",
            "100% 100%",
            "0% 0%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,.14), transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Cyber Grid */}

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Extra Blue Glow */}

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,.22), transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* World Map */}

      <motion.img
        src={worldMap}
        alt="CyberVerse World Map"
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          opacity: 0.96,
          filter: `
            brightness(1.15)
            contrast(1.25)
            saturate(1.25)
            drop-shadow(0 0 18px rgba(0,229,255,.9))
            drop-shadow(0 0 40px rgba(0,229,255,.45))
            drop-shadow(0 0 80px rgba(0,229,255,.25))
          `,
        }}
        animate={{
          opacity: [0.92, 1, 0.92],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* Floating Cyber Particles */}
      {/* Floating Cyber Particles */}

{Array.from({ length: 45 }).map((_, i) => (
  <motion.div
    key={i}
    className="absolute rounded-full bg-cyan-300"
    style={{
      width: 2 + Math.random() * 4,
      height: 2 + Math.random() * 4,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      boxShadow: "0 0 12px #00E5FF",
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-8, 8, -8],
      opacity: [0.15, 1, 0.15],
      scale: [0.8, 1.5, 0.8],
    }}
    transition={{
      duration: 3 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 3,
    }}
  />
))}

{/* Animated Scan Line */}

<motion.div
  className="absolute left-0 right-0 h-[2px]"
  style={{
    background:
      "linear-gradient(90deg, transparent, #00E5FF, transparent)",
    boxShadow: "0 0 20px #00E5FF",
  }}
  animate={{
    top: ["0%", "100%"],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  }}
/>

{/* Side Glow */}

<div
  className="absolute inset-y-0 left-0 w-32"
  style={{
    background:
      "linear-gradient(90deg, rgba(0,229,255,.12), transparent)",
  }}
/>

<div
  className="absolute inset-y-0 right-0 w-32"
  style={{
    background:
      "linear-gradient(-90deg, rgba(0,229,255,.12), transparent)",
  }}
/>

{/* Top Glow */}

<div
  className="absolute left-0 right-0 top-0 h-24"
  style={{
    background:
      "linear-gradient(180deg, rgba(0,229,255,.12), transparent)",
  }}
/>

{/* Bottom Glow */}

<div
  className="absolute bottom-0 left-0 right-0 h-24"
  style={{
    background:
      "linear-gradient(0deg, rgba(0,229,255,.12), transparent)",
  }}
/>

{/* Radar */}

<motion.div
  animate={{
    rotate: 360,
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  }}
  className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10"
/>

<motion.div
  animate={{
    rotate: -360,
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "linear",
  }}
  className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10"
/>

<Radar />

{/* Attack Routes */}
{/* Attack Routes */}

<svg
  className="absolute inset-0 h-full w-full"
  viewBox="0 0 1000 500"
>

  <defs>

    <linearGradient
  id="attackGradient"
  x1="0%"
  y1="0%"
  x2="100%"
  y2="0%"
>
  <stop offset="0%" stopColor={attackColor} />
  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
  <stop offset="100%" stopColor={attackColor} />
</linearGradient>

    <filter id="cyberGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

  </defs>
  {/* Live Attack Routes */}

{liveRoutes.map((route, index) => (
  <motion.path
    key={index}
    d={route}
    fill="none"
    stroke="url(#attackGradient)"
    strokeWidth={2.5}
    strokeDasharray="12 8"
    filter="url(#cyberGlow)"
    animate={{
      pathLength: [0, 1],
      opacity: [0.2, 1, 0.2],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: index * 0.35,
    }}
  />
))}

</svg>

{/* Attack Origin Pulse */}

<motion.div
  className="absolute h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_30px_#00E5FF]"
  style={{
    left: 170,
    top: 180,
  }}
  animate={{
    scale: [1, 2.2, 1],
    opacity: [1, 0.2, 1],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
  }}
/>

<motion.div
  className="absolute h-4 w-4 rounded-full bg-red-500 shadow-[0_0_30px_red]"
  style={{
    left: 430,
    top: 140,
  }}
  animate={{
    scale: [1, 2.2, 1],
    opacity: [1, 0.2, 1],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    delay: 0.5,
  }}
/>



{/* Destination Pulse */}

<motion.div
  className="absolute h-4 w-4 rounded-full"
  style={{
    left: 700,
    top: 220,
    background: attackColor,
    boxShadow: `0 0 25px ${attackGlow}`,
  }}
  animate={{
    scale: [1, 2.5, 1],
    opacity: [1, 0.15, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
/>

<motion.div
  className="absolute h-4 w-4 rounded-full bg-red-500 shadow-[0_0_25px_red]"
  style={{
    left: 790,
    top: 170,
  }}
  animate={{
    scale: [1, 2.5, 1],
    opacity: [1, 0.15, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    delay: 0.5,
  }}
/>
{/* Multiple Moving Packets */}

{[
  {
    sx: 170,
    sy: 180,
    ex: 700,
    ey: 220,
  },
  {
    sx: 430,
    sy: 140,
    ex: 790,
    ey: 170,
  },
  {
    sx: 250,
    sy: 150,
    ex: 760,
    ey: 260,
  },
  {
    sx: 610,
    sy: 120,
    ex: 320,
    ey: 250,
  },
  {
    sx: 845,
    sy: 300,
    ex: 520,
    ey: 165,
  },
  {
    sx: 520,
    sy: 250,
    ex: 170,
    ey: 180,
  },
  {
    sx: 620,
    sy: 180,
    ex: 845,
    ey: 300,
  },
  {
    sx: 790,
    sy: 170,
    ex: 250,
    ey: 150,
  },
].map((packet, index) => (
  <motion.div
    key={index}
    className="absolute h-4 w-4 rounded-full"
    style={{
      background: attackColor,
      boxShadow: `0 0 25px ${attackGlow}`,
    }}
    animate={{
      x: [packet.sx, packet.ex],
      y: [packet.sy, packet.ey],
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2.5 + index * 0.2,
      repeat: Infinity,
      ease: "linear",
      delay: index * 0.25,
    }}
  />
))}
{/* Country Markers */}

{countries.map((country, index) => {

  const active =
    activeCountries.includes(country.label);

  return (

    <motion.div
      key={index}
      onMouseEnter={() =>
        setHoveredCountry(country.label)
      }
      onMouseLeave={() =>
        setHoveredCountry(null)
      }
      animate={{
        scale: active ? [1, 1.35, 1] : 1,
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
      }}
    >

      <CountryMarker
        x={country.x}
        y={country.y}
        label={country.label}
      />

      {/* Hover Popup */}

      {hoveredCountry === country.label && (

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
          }}
          className="absolute z-50 rounded-lg border border-cyan-400 bg-[#081221] p-3 shadow-[0_0_20px_rgba(0,229,255,.35)]"
          style={{
            left: country.x + 18,
            top: country.y - 20,
            minWidth: 170,
          }}
        >

          <h4 className="font-bold text-cyan-300">
            {country.label}
          </h4>

          <p className="mt-2 text-sm text-gray-300">
            Threat Level:
            <span
              className="ml-2 font-bold"
              style={{
                color: attackColor,
              }}
            >
              {isSQL
                ? "HIGH"
                : isDDoS
                ? "MEDIUM"
                : "LOW"}
            </span>
          </p>

          <p className="text-sm text-gray-400">
            Live Monitoring
          </p>

        </motion.div>

      )}

      {active && (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: country.x - 14,
            top: country.y - 14,
            width: 30,
            height: 30,
            border: `2px solid ${attackColor}`,
            boxShadow: `0 0 20px ${attackGlow}`,
          }}
          animate={{
            scale: [1, 2.2],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}

    </motion.div>

  );

})}

{/* Threat Counter */}

<ThreatCounter />

{/* LIVE Status Panel */}

<motion.div
  className="absolute right-5 top-5 z-30 rounded-xl border border-cyan-400/20 bg-[#06101D]/90 px-5 py-4 backdrop-blur-md"
  animate={{
    boxShadow: [
      "0 0 10px rgba(0,229,255,.2)",
      "0 0 25px rgba(0,229,255,.45)",
      "0 0 10px rgba(0,229,255,.2)",
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  <h3 className="text-lg font-bold text-cyan-300">
    SYSTEM STATUS
  </h3>

  <div className="mt-3 space-y-2 text-sm">

    <div className="flex items-center justify-between gap-8">
      <span className="text-gray-400">
        Firewall
      </span>

      <span className="font-semibold text-green-400">
        ACTIVE
      </span>
    </div>

    <div className="flex items-center justify-between gap-8">
      <span className="text-gray-400">
        IDS
      </span>

      <span className="font-semibold text-cyan-300">
        MONITORING
      </span>
    </div>

    <div className="flex items-center justify-between gap-8">
      <span className="text-gray-400">
        Threat Feed
      </span>

      <span className="font-semibold text-yellow-400">
        LIVE
      </span>
    </div>

  </div>
</motion.div>

{/* Header */}

<div className="absolute left-5 top-5 z-20">

  <motion.h2
    className="text-3xl font-extrabold tracking-wide text-cyan-300"
    style={{
      textShadow:
        "0 0 10px #00E5FF,0 0 25px #00E5FF",
    }}
    animate={{
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
    }}
  >
    🌍 LIVE GLOBAL THREAT MAP
  </motion.h2>

  <motion.p
    className="mt-2 text-gray-300"
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
    }}
  >
    {latestAttack
  ? `⚡ LIVE ATTACK : ${liveAttackText}`
  : selectedAttack
  ? `⚡ Active Simulation : ${selectedAttack.name}`
  : "Monitoring Worldwide Cyber Threats"}
  </motion.p>

</div>

{/* Bottom Cyber Bar */}

<div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-cyan-900">

  <motion.div
    className="h-full bg-cyan-300"
    animate={{
      x: ["-100%", "100%"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      width: "25%",
      boxShadow: "0 0 20px #00E5FF",
    }}
  />

</div>

</div>
  );
}

export default WorldMap;