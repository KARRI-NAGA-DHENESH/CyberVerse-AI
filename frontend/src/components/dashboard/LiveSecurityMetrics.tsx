import { motion } from "framer-motion";
import { useMetrics } from "../../context/SystemMetricsContext";

function LiveSecurityMetrics() {
  const metrics = useMetrics();

  const cards = [
    {
      title: "⚡ CPU Usage",
      value: metrics.cpu,
      unit: "%",
      color: "#22c55e",
      status: "Healthy",
    },
    {
      title: "💾 Memory",
      value: metrics.memory,
      unit: "%",
      color: "#00E5FF",
      status: "Stable",
    },
    {
      title: "🌐 Network",
      value: metrics.traffic,
      unit: " Mbps",
      color: "#FFD60A",
      status: "Active",
    },
    {
      title: "🚨 Threats",
      value: metrics.threats,
      unit: "",
      color: "#ff3b30",
      status: "Monitoring",
    },
    {
      title: "🔔 Alerts",
      value: metrics.alerts,
      unit: "",
      color: "#8b5cf6",
      status: "Realtime",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#081221] to-[#0B1628] p-6 shadow-[0_0_30px_rgba(0,229,255,.08)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_50px_rgba(0,229,255,.18)]"
    >
      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20" />

      <div className="relative z-10">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-cyan-300">
              📊 Live Security Metrics
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Real-time monitoring of enterprise infrastructure.
            </p>

          </div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2"
          >
            <span className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

            <span className="text-sm font-semibold text-green-400">
              LIVE
            </span>

          </motion.div>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">

          {cards.map((card, index) => (

            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                scale: 1.03,
                y: -5,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
              }}
              className="rounded-2xl border border-cyan-500/10 bg-[#07111F]/70 p-5 backdrop-blur-md transition-all hover:border-cyan-400/30"
            >

              <div className="flex items-center justify-between">

                <p className="text-sm text-gray-400">
                  {card.title}
                </p>

                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: card.color,
                    boxShadow: `0 0 12px ${card.color}`,
                  }}
                />

              </div>

              <h3
                className="mt-4 text-4xl font-bold"
                style={{
                  color: card.color,
                }}
              >
                {card.value}
                {card.unit}
              </h3>

              <p
                className="mt-1 text-sm font-semibold"
                style={{
                  color: card.color,
                }}
              >
                {card.status}
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#16273C]">

                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: card.color,
                    boxShadow: `0 0 12px ${card.color}`,
                  }}
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${Math.min(card.value, 100)}%`,
                  }}
                  transition={{
                    duration: 1.3,
                  }}
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </motion.div>
  );
}

export default LiveSecurityMetrics;