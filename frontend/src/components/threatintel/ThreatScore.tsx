interface Props {
  score: number;
}

function ThreatScore({ score }: Props) {
  const width = `${score}%`;

  const color =
    score >= 80
      ? "bg-red-500"
      : score >= 50
      ? "bg-yellow-400"
      : "bg-green-500";

  const label =
    score >= 80
      ? "CRITICAL"
      : score >= 50
      ? "MEDIUM"
      : "LOW";

  return (
    <div className="rounded-xl bg-[#0B1628] p-6">

      <h3 className="mb-4 text-xl font-bold text-cyan-400">
        🎯 Threat Score
      </h3>

      <div className="h-5 overflow-hidden rounded-full bg-gray-700">

        <div
          className={`${color} h-full transition-all duration-700`}
          style={{ width }}
        />

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-3xl font-bold text-white">
          {score}/100
        </span>

        <span
          className={`rounded-lg px-4 py-2 font-bold ${
            score >= 80
              ? "bg-red-500"
              : score >= 50
              ? "bg-yellow-400 text-black"
              : "bg-green-500 text-black"
          }`}
        >
          {label}
        </span>

      </div>

    </div>
  );
}

export default ThreatScore;