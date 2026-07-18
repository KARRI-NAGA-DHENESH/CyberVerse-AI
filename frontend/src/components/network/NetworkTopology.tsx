import { motion } from "framer-motion";
import { useCyber } from "../../context/CyberContext";

type NodeProps = {
  title: string;
  color: string;
  active?: boolean;
};

function Node({
  title,
  color,
  active = false,
}: NodeProps) {
  return (
    <motion.div
      animate={
        active
          ? {
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 12px rgba(0,229,255,.35)",
                "0 0 35px rgba(0,229,255,.9)",
                "0 0 12px rgba(0,229,255,.35)",
              ],
            }
          : {}
      }
      transition={{
        repeat: Infinity,
        duration: 1.6,
      }}
      className="relative z-20 w-44 rounded-2xl border border-cyan-500/20 bg-[#081221]/90 backdrop-blur-xl px-5 py-4 text-center"
    >
      <motion.div
        className="mx-auto mb-3 h-4 w-4 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 20px ${color}`,
        }}
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />

      <p className="font-semibold text-white">
        {title}
      </p>
    </motion.div>
  );
}

type LineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function Line({
  x1,
  y1,
  x2,
  y2,
}: LineProps) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#00E5FF"
      strokeWidth="2.5"
      strokeDasharray="10 6"
      animate={{
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
  );
}

function NetworkTopology() {
  const { selectedAttack } = useCyber();

  const database =
    selectedAttack?.name === "SQL Injection";

  const web =
    selectedAttack?.name === "DDoS Attack" ||
    selectedAttack?.name === "Brute Force" ||
    selectedAttack?.name === "Phishing";

  return (
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#06101D] p-6 shadow-[0_0_60px_rgba(0,229,255,.15)]">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-cyan-300">
            🌐 Enterprise Network Topology
          </h2>

          <p className="mt-2 text-gray-400">
            Real-Time Infrastructure Monitoring
          </p>

        </div>

        <motion.div
          className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-400"
          animate={{
            boxShadow: [
              "0 0 8px rgba(34,197,94,.2)",
              "0 0 20px rgba(34,197,94,.6)",
              "0 0 8px rgba(34,197,94,.2)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          ● NETWORK HEALTHY
        </motion.div>

      </div>

      <div className="relative h-[760px] overflow-hidden rounded-2xl bg-[#020817]">

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
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,229,255,.12), transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Grid */}

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

        {/* Network Connections */}

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 760"
        >

          <defs>

            <filter id="networkGlow">

              <feGaussianBlur
                stdDeviation="3"
                result="blur"
              />

              <feMerge>

                <feMergeNode in="blur" />

                <feMergeNode in="SourceGraphic" />

              </feMerge>

            </filter>

          </defs>

          <g filter="url(#networkGlow)">

            <Line x1={500} y1={70} x2={500} y2={170} />

            <Line x1={500} y1={170} x2={260} y2={300} />

            <Line x1={500} y1={170} x2={740} y2={300} />

            <Line x1={260} y1={300} x2={180} y2={520} />

            <Line x1={260} y1={300} x2={340} y2={520} />

            <Line x1={740} y1={300} x2={660} y2={520} />

            <Line x1={740} y1={300} x2={820} y2={520} />

            <Line x1={500} y1={170} x2={500} y2={660} />

          </g>

        </svg>
                {/* Internet */}

        <div className="absolute left-1/2 top-6 -translate-x-1/2">
          <Node
            title="Internet"
            color="#00E5FF"
          />
        </div>

        {/* Firewall */}

        <div className="absolute left-1/2 top-36 -translate-x-1/2">
          <Node
            title="Next-Gen Firewall"
            color="#ff3b30"
            active
          />
        </div>

        {/* Web Server */}

        <div className="absolute left-[170px] top-[270px]">
          <Node
            title="Web Server"
            color="#22c55e"
            active={web}
          />
        </div>

        {/* Load Balancer */}

        <div className="absolute left-[410px] top-[270px]">
          <Node
            title="Load Balancer"
            color="#00E5FF"
          />
        </div>

        {/* Database */}

        <div className="absolute right-[170px] top-[270px]">
          <Node
            title="Database Cluster"
            color="#f59e0b"
            active={database}
          />
        </div>

        {/* User PC */}

        <div className="absolute left-[90px] top-[520px]">
          <Node
            title="Employee PC"
            color="#3b82f6"
          />
        </div>

        {/* SOC */}

        <div className="absolute left-[300px] top-[520px]">
          <Node
            title="SOC Console"
            color="#8b5cf6"
          />
        </div>

        {/* Admin */}

        <div className="absolute right-[300px] top-[520px]">
          <Node
            title="Admin Console"
            color="#14b8a6"
          />
        </div>

        {/* Backup */}

        <div className="absolute right-[90px] top-[520px]">
          <Node
            title="Backup Server"
            color="#eab308"
          />
        </div>

        {/* Core Switch */}

        <div className="absolute left-1/2 bottom-8 -translate-x-1/2">
          <Node
            title="Core Switch"
            color="#06b6d4"
          />
        </div>

        {/* Attack Packet */}

        <motion.div
          className="absolute h-5 w-5 rounded-full bg-red-500"
          style={{
            boxShadow:
              "0 0 25px red",
          }}
          animate={{
            x: database
              ? [500, 500, 740]
              : [500, 500, 260],

            y: [60, 170, 300],

            scale: [1, 1.6, 1],

            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Network Pulse */}

        <motion.div
          className="absolute left-1/2 top-[170px] h-8 w-8 -translate-x-1/2 rounded-full border-2 border-cyan-300"
          animate={{
            scale: [1, 3],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
                {/* Live Status Panel */}

        <motion.div
          className="absolute right-6 top-6 z-30 w-72 rounded-2xl border border-cyan-500/20 bg-[#081221]/90 p-5 backdrop-blur-xl"
          animate={{
            boxShadow: [
              "0 0 12px rgba(0,229,255,.2)",
              "0 0 28px rgba(0,229,255,.45)",
              "0 0 12px rgba(0,229,255,.2)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <h3 className="mb-4 text-lg font-bold text-cyan-300">
            Live Network Status
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-400">
                Firewall
              </span>

              <span className="text-green-400 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                IDS
              </span>

              <span className="text-cyan-300 font-semibold">
                MONITORING
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Traffic
              </span>

              <span className="text-yellow-400 font-semibold">
                NORMAL
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Threat Level
              </span>

              <span
                className={`font-semibold ${
                  database || web
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {database || web
                  ? "UNDER ATTACK"
                  : "SECURE"}
              </span>
            </div>

          </div>
        </motion.div>

        {/* Floating Cyber Particles */}

        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-cyan-300"
            style={{
              width: 3,
              height: 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 12px #00E5FF",
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

      </div>

    </div>
  );
}

export default NetworkTopology;