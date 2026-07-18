import { motion } from "framer-motion";

const countries = [
  {
    country: "USA",
    flag: "🇺🇸",
    attacks: 356,
    color: "#ff3b30",
  },
  {
    country: "India",
    flag: "🇮🇳",
    attacks: 282,
    color: "#00E5FF",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    attacks: 214,
    color: "#FFD60A",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    attacks: 180,
    color: "#22c55e",
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    attacks: 144,
    color: "#8b5cf6",
  },
];

function TopTargetCountries() {
  const max = Math.max(...countries.map((c) => c.attacks));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#081221] to-[#0B1628] p-6 shadow-[0_0_25px_rgba(0,229,255,.08)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(0,229,255,.18)]"
    >
      {/* Background Glow */}

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

      <div className="relative z-10">

        <h2 className="text-2xl font-bold text-cyan-300">
          🌍 Top Target Countries
        </h2>

        <p className="mb-8 mt-2 text-sm text-gray-400">
          Countries experiencing the highest cyber attack activity.
        </p>

        <div className="space-y-6">

          {countries.map((item, index) => {

            const percent = Math.round(
              (item.attacks / max) * 100
            );

            return (
              <motion.div
                key={item.country}
                whileHover={{
                  scale: 1.02,
                }}
                className="rounded-2xl border border-cyan-500/10 bg-[#07111F]/70 p-4 transition-all hover:border-cyan-400/30"
              >

                <div className="mb-3 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span className="text-3xl">
                      {item.flag}
                    </span>

                    <div>

                      <h3 className="font-semibold text-white">
                        {item.country}
                      </h3>

                      <p className="text-xs text-gray-400">
                        Threat Activity
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p
                      className="text-xl font-bold"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.attacks}
                    </p>

                    <p className="text-xs text-gray-400">
                      attacks
                    </p>

                  </div>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-[#11263f]">

                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${percent}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.15,
                    }}
                  />

                </div>

                <div className="mt-2 flex justify-end">

                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: item.color,
                    }}
                  >
                    {percent}% Risk
                  </span>

                </div>

              </motion.div>
            );

          })}

        </div>

      </div>

    </motion.div>
  );
}

export default TopTargetCountries;