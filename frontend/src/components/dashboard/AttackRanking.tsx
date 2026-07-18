import { motion } from "framer-motion";

const attacks = [
  {
    rank: 1,
    name: "SQL Injection",
    value: 38,
    color: "#ff3b30",
    trend: "▲ +12%",
  },
  {
    rank: 2,
    name: "DDoS",
    value: 26,
    color: "#ff9500",
    trend: "▲ +8%",
  },
  {
    rank: 3,
    name: "Malware",
    value: 17,
    color: "#FFD60A",
    trend: "▼ -2%",
  },
  {
    rank: 4,
    name: "Phishing",
    value: 11,
    color: "#00E5FF",
    trend: "▲ +4%",
  },
  {
    rank: 5,
    name: "Botnet",
    value: 8,
    color: "#22c55e",
    trend: "▼ -1%",
  },
];

function AttackRanking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#081221] to-[#0B1628] p-6 shadow-[0_0_25px_rgba(0,229,255,.08)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(0,229,255,.18)]"
    >
      {/* Background Glow */}

      <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

      <div className="relative z-10">

        <h2 className="text-2xl font-bold text-cyan-300">
          🎯 Attack Type Ranking
        </h2>

        <p className="mb-8 mt-2 text-sm text-gray-400">
          Most frequently detected attack vectors.
        </p>

        <div className="space-y-5">

          {attacks.map((attack, index) => (

            <motion.div
              key={attack.name}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-cyan-500/10 bg-[#07111F]/70 p-4 transition-all hover:border-cyan-400/30"
            >

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.2,
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{
                      background: attack.color,
                      boxShadow: `0 0 18px ${attack.color}`,
                    }}
                  >
                    #{attack.rank}
                  </motion.div>

                  <div>

                    <h3 className="font-semibold text-white">
                      {attack.name}
                    </h3>

                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: attack.color,
                      }}
                    >
                      {attack.trend}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p
                    className="text-2xl font-bold"
                    style={{
                      color: attack.color,
                    }}
                  >
                    {attack.value}%
                  </p>

                  <p className="text-xs text-gray-400">
                    Total Share
                  </p>

                </div>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#11263f]">

                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: attack.color,
                    boxShadow: `0 0 14px ${attack.color}`,
                  }}
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${attack.value}%`,
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

export default AttackRanking;