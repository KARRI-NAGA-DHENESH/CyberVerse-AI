import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number;
}

function ThreatGauge({ score }: Props) {
  let color = "#22C55E";
  let level = "LOW";

  if (score >= 70) {
    color = "#EF4444";
    level = "HIGH";
  } else if (score >= 40) {
    color = "#FACC15";
    level = "MEDIUM";
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-center text-2xl font-bold text-cyan-400">
        🎯 Threat Score
      </h2>

      <div className="mx-auto h-56 w-56">

        <CircularProgressbar
          value={score}
          maxValue={100}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#FFFFFF",
            trailColor: "#1E293B",
          })}
        />

      </div>

      <div className="mt-6 text-center">

        <span
          className={`rounded-lg px-5 py-2 font-bold ${
            level === "HIGH"
              ? "bg-red-500 text-white"
              : level === "MEDIUM"
              ? "bg-yellow-500 text-black"
              : "bg-green-500 text-black"
          }`}
        >
          {level} RISK
        </span>

      </div>

    </div>
  );
}

export default ThreatGauge;