import { motion } from "framer-motion";

const threatFeed = [
  {
    ip: "185.220.101.45",
    country: "Russia",
    severity: "Critical",
    color: "#ff3b30",
    type: "Botnet C2",
  },
  {
    ip: "103.145.67.210",
    country: "China",
    severity: "High",
    color: "#ff9500",
    type: "Malware",
  },
  {
    ip: "45.89.23.144",
    country: "North Korea",
    severity: "Critical",
    color: "#ff3b30",
    type: "APT Activity",
  },
  {
    ip: "91.214.124.88",
    country: "Iran",
    severity: "Medium",
    color: "#FFD60A",
    type: "Phishing",
  },
];

function ThreatIntelligenceCenter() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#06101D] p-8 shadow-[0_0_60px_rgba(0,229,255,.18)]">

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
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,.12), transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-cyan-300">
          🌍 Global Threat Intelligence
        </h2>

        <p className="mt-2 text-gray-400">
          Live cyber threat intelligence collected from worldwide security feeds
        </p>
                {/* Live Threat Feed */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

          <h3 className="mb-6 text-xl font-bold text-cyan-300">
            🚨 Live Threat Feed
          </h3>

          <div className="space-y-4">

            {threatFeed.map((threat, index) => (

              <motion.div
                key={threat.ip}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.12,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                className="flex items-center justify-between rounded-xl border border-cyan-500/10 bg-[#0B1628] p-5"
              >

                <div>

                  <p className="font-bold text-white">
                    {threat.ip}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {threat.country}
                  </p>

                </div>

                <div>

                  <p
                    className="font-bold"
                    style={{
                      color: threat.color,
                    }}
                  >
                    {threat.type}
                  </p>

                  <p
                    className="mt-1 text-sm"
                    style={{
                      color: threat.color,
                    }}
                  >
                    {threat.severity}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

        {/* IOC Overview */}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {[
            {
              title: "Malicious IPs",
              value: "2,184",
              color: "#ff3b30",
            },
            {
              title: "Domains",
              value: "941",
              color: "#FFD60A",
            },
            {
              title: "Malware Hashes",
              value: "6,320",
              color: "#00E5FF",
            },
            {
              title: "Active CVEs",
              value: "418",
              color: "#22c55e",
            },
          ].map((item) => (

            <motion.div
              key={item.title}
              whileHover={{
                scale: 1.04,
              }}
              className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-5"
            >

              <p className="text-gray-400">
                {item.title}
              </p>

              <h3
                className="mt-3 text-3xl font-bold"
                style={{
                  color: item.color,
                }}
              >
                {item.value}
              </h3>

            </motion.div>

          ))}

        </div>
                {/* Malware Families + Top CVEs */}

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Malware Families */}

          <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

            <h3 className="mb-6 text-xl font-bold text-cyan-300">
              🦠 Active Malware Families
            </h3>

            <div className="space-y-4">

              {[
                {
                  name: "LockBit",
                  risk: "Critical",
                  color: "#ff3b30",
                },
                {
                  name: "Emotet",
                  risk: "High",
                  color: "#ff9500",
                },
                {
                  name: "QakBot",
                  risk: "High",
                  color: "#FFD60A",
                },
                {
                  name: "Agent Tesla",
                  risk: "Medium",
                  color: "#00E5FF",
                },
              ].map((item, index) => (

                <motion.div
                  key={item.name}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className="flex items-center justify-between rounded-xl bg-[#0B1628] p-4"
                >

                  <span className="font-semibold text-white">
                    {item.name}
                  </span>

                  <span
                    className="font-bold"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.risk}
                  </span>

                </motion.div>

              ))}

            </div>

          </div>

          {/* Critical CVEs */}

          <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

            <h3 className="mb-6 text-xl font-bold text-cyan-300">
              🎯 Critical CVEs
            </h3>

            <div className="space-y-4">

              {[
                {
                  id: "CVE-2026-18412",
                  score: "9.8",
                },
                {
                  id: "CVE-2026-14451",
                  score: "9.6",
                },
                {
                  id: "CVE-2025-9981",
                  score: "9.4",
                },
                {
                  id: "CVE-2025-7630",
                  score: "8.9",
                },
              ].map((item, index) => (

                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className="flex items-center justify-between rounded-xl bg-[#0B1628] p-4"
                >

                  <span className="font-semibold text-white">
                    {item.id}
                  </span>

                  <span className="font-bold text-red-400">
                    CVSS {item.score}
                  </span>

                </motion.div>

              ))}

            </div>

          </div>

        </div>
                {/* Intelligence Status */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-xl font-bold text-cyan-300">
              📡 Threat Intelligence Status
            </h3>

            <motion.span
              className="font-bold text-green-400"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            >
              ● LIVE
            </motion.span>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-[#0B1628] p-5">

              <p className="text-gray-400">
                Intelligence Sources
              </p>

              <h3 className="mt-3 text-3xl font-bold text-cyan-300">
                184
              </h3>

            </div>

            <div className="rounded-xl bg-[#0B1628] p-5">

              <p className="text-gray-400">
                IOC Updates Today
              </p>

              <h3 className="mt-3 text-3xl font-bold text-yellow-400">
                3,462
              </h3>

            </div>

            <div className="rounded-xl bg-[#0B1628] p-5">

              <p className="text-gray-400">
                Confidence Score
              </p>

              <h3 className="mt-3 text-3xl font-bold text-green-400">
                98.7%
              </h3>

            </div>

          </div>

        </div>

        {/* Live Feed Status */}

        <motion.div
          className="mt-8 rounded-2xl border border-green-500/20 bg-[#081221] p-6"
          animate={{
            boxShadow: [
              "0 0 10px rgba(34,197,94,.2)",
              "0 0 30px rgba(34,197,94,.45)",
              "0 0 10px rgba(34,197,94,.2)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >

          <h3 className="text-xl font-bold text-green-400">
            ✅ Live Intelligence Feed Connected
          </h3>

          <p className="mt-3 leading-7 text-gray-300">
            CyberVerse AI is continuously collecting and correlating
            Indicators of Compromise (IOCs), CVEs, malware signatures,
            botnet activity, phishing campaigns, ransomware intelligence,
            and global attack telemetry from multiple threat intelligence
            sources in real time.
          </p>

        </motion.div>

      </div>

      {/* Bottom Neon Glow */}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00E5FF, transparent)",
          boxShadow: "0 0 25px #00E5FF",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

    </div>
  );
}

export default ThreatIntelligenceCenter;