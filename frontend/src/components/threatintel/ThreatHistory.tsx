import { useState } from "react";

import ThreatChart from "../charts/ThreatChart";
import StatsCard from "./StatsCard";

interface HistoryItem {
  ip: string;
  threatLevel: string;
  threatScore: number;
  time: string;
}

interface Props {
  history: HistoryItem[];
  clearHistory: () => void;
}

function ThreatHistory({
  history,
  clearHistory,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.ip
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" ||
      item.threatLevel === filter;

    return matchesSearch && matchesFilter;
  });

  const totalInvestigations = history.length;

  const highThreats = history.filter(
    (item) => item.threatLevel === "HIGH"
  ).length;

  const mediumThreats = history.filter(
    (item) => item.threatLevel === "MEDIUM"
  ).length;

  const lowThreats = history.filter(
    (item) => item.threatLevel === "LOW"
  ).length;

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-cyan-400">
          📜 Threat Investigation History
        </h2>

        <button
          onClick={clearHistory}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          🗑 Clear History
        </button>

      </div>

      {/* Dashboard Summary */}

      <div className="mb-6 grid gap-4 md:grid-cols-4">

        <StatsCard
          title="Total Investigations"
          value={totalInvestigations}
          color="#06B6D4"
        />

        <StatsCard
          title="High Threats"
          value={highThreats}
          color="#EF4444"
        />

        <StatsCard
          title="Medium Threats"
          value={mediumThreats}
          color="#FACC15"
        />

        <StatsCard
          title="Low Threats"
          value={lowThreats}
          color="#22C55E"
        />

      </div>

      {/* Threat Analytics */}

      <div className="mb-6">

        <ThreatChart
          high={highThreats}
          medium={mediumThreats}
          low={lowThreats}
        />

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search IP Address..."
          className="w-full rounded-xl border border-cyan-500/20 bg-[#081221] p-4 text-white outline-none transition focus:border-cyan-400"
        />

        {/* Threat Filter */}

        <div className="mt-4 flex flex-wrap gap-3">

          {["ALL", "HIGH", "MEDIUM", "LOW"].map((level) => (

            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                filter === level
                  ? "bg-cyan-500 text-black"
                  : "bg-[#0B1628] text-white hover:bg-[#10203B]"
              }`}
            >
              {level}
            </button>

          ))}

        </div>

      </div>
            {filteredHistory.length === 0 ? (

        <div className="rounded-xl bg-[#0B1628] p-10 text-center">

          <h3 className="text-xl font-semibold text-gray-300">
            No Matching Investigations
          </h3>

          <p className="mt-2 text-gray-500">
            Search another IP or perform a new investigation.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto rounded-xl bg-[#0B1628]">

          <table className="w-full">

            <thead>

              <tr className="border-b border-cyan-500/20">

                <th className="p-4 text-left text-cyan-400">
                  Time
                </th>

                <th className="p-4 text-left text-cyan-400">
                  IP Address
                </th>

                <th className="p-4 text-left text-cyan-400">
                  Threat Level
                </th>

                <th className="p-4 text-left text-cyan-400">
                  Threat Score
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredHistory.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-cyan-500/10 transition hover:bg-cyan-500/5"
                >

                  <td className="p-4 text-gray-300">
                    {item.time}
                  </td>

                  <td className="p-4 font-semibold text-white">
                    {item.ip}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-lg px-3 py-1 text-sm font-bold ${
                        item.threatLevel === "HIGH"
                          ? "bg-red-500 text-white"
                          : item.threatLevel === "MEDIUM"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-black"
                      }`}
                    >
                      {item.threatLevel}
                    </span>

                  </td>

                  <td className="p-4 font-bold text-cyan-400">
                    {item.threatScore}/100
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default ThreatHistory;