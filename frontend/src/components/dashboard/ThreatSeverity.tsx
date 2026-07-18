import { motion } from "framer-motion";

const severities = [
  {
    level: "Critical",
    percent: 42,
    color: "#ff3b30",
  },
  {
    level: "High",
    percent: 31,
    color: "#ff9500",
  },
  {
    level: "Medium",
    percent: 18,
    color: "#ffd60a",
  },
  {
    level: "Low",
    percent: 9,
    color: "#22c55e",
  },
];

function ThreatSeverity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#081221] to-[#0B1628] p-6 shadow-[0_0_25px_rgba(0,229,255,.08)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(0,229,255,.18)]"
    >
      {/* Background Glow */}

      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

      <div className="relative z-10">

        <h2 className="text-2xl font-bold text-cyan-300">
          🚨 Threat Severity
        </h2>

        <p className="mb-8 mt-2 text-sm text-gray-400">
          Current distribution of detected cyber threats.
        </p>

        <div className="space-y-6">

          {severities.map((item, index) => (

            <motion.div
              key={item.level}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-cyan-500/10 bg-[#07111F]/70 p-4 transition-all hover:border-cyan-400/30"
            >

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                  />

                  <span
                    className="font-semibold"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.level}
                  </span>

                </div>

                <span
                  className="text-lg font-bold"
                  style={{
                    color: item.color,
                  }}
                >
                  {item.percent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#13243a]">

                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: item.color,
                    boxShadow: `0 0 14px ${item.color}`,
                  }}
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${item.percent}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.4,
                    delay: index * 0.15,
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

export default ThreatSeverity;