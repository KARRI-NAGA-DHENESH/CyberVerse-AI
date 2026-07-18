import { useState } from "react";
import { motion } from "framer-motion";

function IntrusionDetector() {

  const [packets, setPackets] = useState(0);
  const [traffic, setTraffic] = useState(0);
  const [failed, setFailed] = useState(0);

  const [result, setResult] = useState<any>(null);

  async function analyze() {

    const response = await fetch(`${import.meta.env.VITE_ML_API}/api/intrusion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packets,
          traffic,
          failed_logins: failed,
        }),
      }
    );

    const data = await response.json();

    setResult(data);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6"
    >

      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        🌐 Network Intrusion Detection
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <input
          type="number"
          placeholder="Packets"
          className="rounded-xl bg-[#0B1628] p-3 text-white"
          onChange={(e) =>
            setPackets(Number(e.target.value))
          }
        />

        <input
          type="number"
          placeholder="Traffic"
          className="rounded-xl bg-[#0B1628] p-3 text-white"
          onChange={(e) =>
            setTraffic(Number(e.target.value))
          }
        />

        <input
          type="number"
          placeholder="Failed Logins"
          className="rounded-xl bg-[#0B1628] p-3 text-white"
          onChange={(e) =>
            setFailed(Number(e.target.value))
          }
        />

      </div>

      <button
        onClick={analyze}
        className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
      >
        Analyze Network
      </button>

      {result && (

        <div className="mt-6 rounded-xl bg-[#0B1628] p-5">

          <h3 className="text-xl font-bold text-white">
            Prediction
          </h3>

          <p className="mt-4 text-3xl font-bold text-cyan-300">
            {result.prediction}
          </p>

          <p className="mt-2 text-gray-400">
            Confidence: {result.confidence}%
          </p>

        </div>

      )}

    </motion.div>
  );
}

export default IntrusionDetector;