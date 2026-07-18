import { motion } from "framer-motion";
import { useCyber } from "../../context/CyberContext";

const timeline = [
  "External Reconnaissance Detected",
  "Malicious Payload Sent",
  "Firewall Inspection Started",
  "Threat Correlation Completed",
  "Attack Successfully Blocked",
];

function AIIncidentReport() {
  const { selectedAttack } = useCyber();

  const severityColor =
    selectedAttack?.severity === "Critical"
      ? "#ff3b30"
      : selectedAttack?.severity === "High"
      ? "#ff9500"
      : selectedAttack?.severity === "Medium"
      ? "#FFD60A"
      : "#22c55e";

  const mitreId =
    selectedAttack?.name === "SQL Injection"
      ? "T1190"
      : selectedAttack?.name === "DDoS Attack"
      ? "T1498"
      : selectedAttack?.name === "Brute Force"
      ? "T1110"
      : selectedAttack?.name === "Phishing"
      ? "T1566"
      : selectedAttack?.name === "Malware"
      ? "T1105"
      : "T1071";

  const riskScore =
    selectedAttack?.severity === "Critical"
      ? "9.8 / 10"
      : selectedAttack?.severity === "High"
      ? "8.2 / 10"
      : selectedAttack?.severity === "Medium"
      ? "6.1 / 10"
      : "3.5 / 10";

  const findings = [
    {
      title: "Attack Type",
      value: selectedAttack?.name ?? "Monitoring",
      color: severityColor,
    },
    {
      title: "Confidence",
      value: "98%",
      color: "#22c55e",
    },
    {
      title: "MITRE",
      value: mitreId,
      color: "#00E5FF",
    },
    {
      title: "Risk Score",
      value: riskScore,
      color: "#FFD60A",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#06101D] p-8 shadow-[0_0_60px_rgba(0,229,255,.15)]">

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
            "radial-gradient(circle at center, rgba(0,229,255,.10), transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-cyan-300">
          🤖 AI Incident Investigation
        </h2>

        <p className="mt-2 text-gray-400">
          AI-powered forensic investigation and response engine
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          {findings.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-5"
            >
              <p className="text-gray-400">{item.title}</p>

              <h3
                className="mt-3 text-3xl font-bold"
                style={{ color: item.color }}
              >
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>
                <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* AI Summary */}

          <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

            <h3 className="mb-4 text-xl font-bold text-cyan-300">
              🧠 AI Summary
            </h3>

            <p className="leading-8 text-gray-300">
              CyberVerse AI detected a{" "}
              <span
                className="font-bold"
                style={{ color: severityColor }}
              >
                {selectedAttack?.name ?? "network activity"}
              </span>{" "}
              originating from{" "}
              <span className="font-bold text-cyan-300">
                {selectedAttack?.source ?? "Unknown"}
              </span>{" "}
              targeting{" "}
              <span className="font-bold text-cyan-300">
                {selectedAttack?.target ?? "Unknown"}
              </span>
              . Behavioral analysis, threat intelligence correlation and
              AI inspection indicate that the attack has been detected
              before causing significant damage. Automated containment
              procedures have been initiated.
            </p>

          </div>

          {/* AI Recommendation */}

          <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

            <h3 className="mb-4 text-xl font-bold text-cyan-300">
              ✅ Recommended Actions
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>• Isolate affected endpoint</li>

              <li>• Block malicious source IP</li>

              <li>• Review SIEM & Firewall logs</li>

              <li>• Perform IOC scan</li>

              <li>• Patch vulnerable services</li>

              <li>• Continue live monitoring</li>

            </ul>

          </div>

        </div>

        {/* Timeline + MITRE */}

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Timeline */}

          <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

            <h3 className="mb-6 text-xl font-bold text-cyan-300">
              🕒 Investigation Timeline
            </h3>

            <div className="space-y-5">

              {timeline.map((event, index) => (

                <motion.div
                  key={event}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className="flex items-start gap-4"
                >

                  <div
                    className="mt-1 h-4 w-4 rounded-full"
                    style={{
                      background: severityColor,
                      boxShadow: `0 0 15px ${severityColor}`,
                    }}
                  />

                  <div>

                    <p className="font-semibold text-white">
                      {event}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Event #{index + 1}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>
                    {/* MITRE ATT&CK */}

          <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

            <h3 className="mb-6 text-xl font-bold text-cyan-300">
              🎯 MITRE ATT&CK Mapping
            </h3>

            <div className="space-y-4">

              <div className="rounded-xl bg-[#0B1628] p-4">

                <p className="text-gray-400">
                  Technique
                </p>

                <h4
                  className="mt-2 text-lg font-bold"
                  style={{ color: severityColor }}
                >
                  {mitreId} — {selectedAttack?.name ?? "Unknown Attack"}
                </h4>

              </div>

              <div className="rounded-xl bg-[#0B1628] p-4">

                <p className="text-gray-400">
                  Tactic
                </p>

                <h4 className="mt-2 text-lg font-bold text-yellow-400">
                  Initial Access
                </h4>

              </div>

              <div className="rounded-xl bg-[#0B1628] p-4">

                <p className="text-gray-400">
                  Detection Status
                </p>

                <h4 className="mt-2 text-lg font-bold text-green-400">
                  Successfully Detected & Blocked
                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* AI Confidence */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-xl font-bold text-cyan-300">
              🤖 AI Confidence Score
            </h3>

            <span className="text-2xl font-bold text-green-400">
              98%
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-[#13243a]">

            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#22c55e,#00E5FF)",
              }}
              initial={{
                width: 0,
              }}
              animate={{
                width: "98%",
              }}
              transition={{
                duration: 2,
              }}
            />

          </div>

          <p className="mt-4 text-gray-400 leading-7">
            CyberVerse AI has analyzed the live attack originating from{" "}
            <span className="font-bold text-cyan-300">
              {selectedAttack?.source ?? "Unknown"}
            </span>{" "}
            targeting{" "}
            <span className="font-bold text-cyan-300">
              {selectedAttack?.target ?? "Unknown"}
            </span>
            . Threat intelligence correlation, behavioral analysis and
            anomaly detection indicate a high-confidence classification.
          </p>

        </div>
                {/* Investigation Status */}

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
            ✅ Investigation Complete
          </h3>

          <p className="mt-3 leading-7 text-gray-300">
            CyberVerse AI successfully investigated the live{" "}
            <span
              className="font-bold"
              style={{ color: severityColor }}
            >
              {selectedAttack?.name ?? "security incident"}
            </span>
            . The attack originated from{" "}
            <span className="font-bold text-cyan-300">
              {selectedAttack?.source ?? "Unknown"}
            </span>{" "}
            targeting{" "}
            <span className="font-bold text-cyan-300">
              {selectedAttack?.target ?? "Unknown"}
            </span>
            . AI correlation, behavioral analysis and threat intelligence
            confirmed the incident and recommended immediate mitigation.
          </p>

        </motion.div>

      </div>

      {/* Bottom Glow */}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00E5FF, transparent)",
          boxShadow: "0 0 20px #00E5FF",
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

export default AIIncidentReport;