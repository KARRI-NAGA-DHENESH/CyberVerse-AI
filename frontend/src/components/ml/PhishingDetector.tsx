import { motion } from "framer-motion";
import { useState } from "react";

type PredictionResult = {
  prediction: string;
  confidence: number;
  matched_words: string[];
};

function PhishingDetector() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<PredictionResult | null>(null);

  async function analyzeEmail() {
    if (!email.trim()) {
      alert("Please paste an email first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_ML_API}/api/phishing`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to Python ML Server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        📧 Phishing Email Detector
      </h2>

      <textarea
        rows={10}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Paste suspicious email here..."
        className="w-full rounded-xl border border-cyan-500/20 bg-[#0B1628] p-4 text-white outline-none"
      />

      <button
        onClick={analyzeEmail}
        disabled={loading}
        className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
      >
        {loading ? "Analyzing..." : "Analyze Email"}
      </button>

      {result && (

<div className="mt-8 space-y-5">

  {/* Prediction Card */}

  <div className="rounded-xl border border-cyan-500/20 bg-[#0B1628] p-5">

    <h3 className="mb-5 text-xl font-bold text-white">
      AI Prediction
    </h3>

    <div className="flex items-center justify-between">

      <span className="text-lg text-gray-300">
        Classification
      </span>

      <span
        className={`text-2xl font-bold ${
          result.prediction === "Phishing"
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {result.prediction}
      </span>

    </div>

  </div>

  {/* Confidence */}

  <div className="rounded-xl border border-cyan-500/20 bg-[#0B1628] p-5">

    <div className="mb-3 flex justify-between">

      <span className="text-white">
        AI Confidence
      </span>

      <span className="font-bold text-cyan-300">
        {result.confidence}%
      </span>

    </div>

    <div className="h-3 overflow-hidden rounded-full bg-[#1a2d45]">

      <div
        className="h-full rounded-full bg-cyan-400"
        style={{
          width: `${result.confidence}%`,
        }}
      />

    </div>

  </div>

  {/* Keywords */}

  <div className="rounded-xl border border-cyan-500/20 bg-[#0B1628] p-5">

    <h3 className="mb-4 text-lg font-bold text-white">
      Suspicious Indicators
    </h3>

    <div className="flex flex-wrap gap-3">

      {result.matched_words.length === 0 ? (

        <span className="text-green-400">
          No suspicious indicators found.
        </span>

      ) : (

        result.matched_words.map((word) => (

          <span
            key={word}
            className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-300"
          >
            {word}
          </span>

        ))

      )}

    </div>

  </div>

</div>

)}

    </motion.div>
  );
}

export default PhishingDetector;