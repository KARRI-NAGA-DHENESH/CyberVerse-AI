import { useState } from "react";
import type { ChangeEvent } from "react";
import { askGemini } from "../../services/gemini";

import DropZone from "./DropZone";
import AnalysisCard from "./AnalysisCard";
import SeverityBadge from "./SeverityBadge";
import AttackTimeline from "./AttackTimeline";

import SecurityChart from "../charts/SecurityChart";

import { generatePDF } from "../../utils/pdfReport";

function LogAnalyzer() {
  const [logText, setLogText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const [severity, setSeverity] = useState<
    "Critical" | "High" | "Medium" | "Low"
  >("Low");

  const [attackType, setAttackType] = useState("Unknown");
  const [riskScore, setRiskScore] = useState("0.0");
  const [mitre, setMitre] = useState("");
  const [summary, setSummary] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const [timeline, setTimeline] = useState([
    {
      time: "--:--",
      title: "Waiting for analysis...",
      color: "bg-cyan-500",
    },
  ]);

  const [chartData, setChartData] = useState([
    {
      name: "No Data",
      attacks: 0,
    },
  ]);

  function handleFileUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;

      if (typeof text === "string") {
        setLogText(text);
      }
    };

    reader.readAsText(file);
  }

  async function analyzeLogs() {
    if (!logText.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const prompt = `
You are CyberVerse AI.

You are an expert SOC (Security Operations Center) Analyst.

Analyze the following security logs.

Return ONLY valid JSON.

{
  "attackType":"",
  "severity":"",
  "riskScore":"",
  "mitre":"",
  "summary":"",
  "recommendation":""
}

Logs:

${logText}
`;

      const result = await askGemini(prompt);

      const cleaned = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleaned);

      setAttackType(data.attackType || "Unknown");

      setSeverity(
        (data.severity as
          | "Critical"
          | "High"
          | "Medium"
          | "Low") || "Low"
      );

      setRiskScore(data.riskScore || "0.0");
      setMitre(data.mitre || "N/A");
      setSummary(data.summary || "");
      setRecommendation(data.recommendation || "");

      setTimeline([
        {
          time: "09:15",
          title: data.attackType || "Unknown Attack",
          color: "bg-red-500",
        },
        {
          time: "09:16",
          title: "Firewall detected malicious traffic",
          color: "bg-green-500",
        },
        {
          time: "09:18",
          title: "SQL Injection attempt",
          color: "bg-yellow-500",
        },
        {
          time: "09:20",
          title: "Malware activity detected",
          color: "bg-orange-500",
        },
        {
          time: "09:23",
          title: "SOC investigation started",
          color: "bg-cyan-500",
        },
      ]);

      setChartData([
        {
          name: data.attackType || "Unknown",
          attacks: 10,
        },
        {
          name: "Firewall",
          attacks: 6,
        },
        {
          name: "SQL Injection",
          attacks: 3,
        },
        {
          name: "Malware",
          attacks: 4,
        },
      ]);

      setResponse(cleaned);
    } catch (error) {
      console.error(error);

      setResponse(
        "❌ Gemini returned an invalid JSON response.\nPlease try again."
      );
    }

    setLoading(false);
  }
    function clearLogs() {
    setLogText("");
    setResponse("");
    setFileName("");

    setAttackType("Unknown");
    setSeverity("Low");
    setRiskScore("0.0");
    setMitre("");
    setSummary("");
    setRecommendation("");

    setTimeline([
      {
        time: "--:--",
        title: "Waiting for analysis...",
        color: "bg-cyan-500",
      },
    ]);

    setChartData([
      {
        name: "No Data",
        attacks: 0,
      },
    ]);
  }

function downloadReport() {
  generatePDF({
    title: "CyberVerse AI Log Analysis Report",
    content: logText,

    attackType,
    severity,
    riskScore,
    mitre,
    summary,
    recommendation,
  });
}

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📂 AI Log Analyzer
      </h2>

      {/* Upload Area */}
      <DropZone
        fileName={fileName}
        onUpload={handleFileUpload}
      />

      {/* Log Input */}
      <textarea
        rows={12}
        value={logText}
        onChange={(e) => setLogText(e.target.value)}
        placeholder="Upload a log file or paste security logs here..."
        className="mt-6 w-full rounded-xl border border-cyan-500/20 bg-[#081221] p-4 text-white outline-none"
      />

      {/* Buttons */}
      <div className="mt-5 flex flex-wrap gap-4">
        <button
          onClick={analyzeLogs}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
        >
          🔍 Analyze Logs
        </button>

        <button
          onClick={clearLogs}
          className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400"
        >
          🗑 Clear
        </button>

        <button
          onClick={downloadReport}
          disabled={!response}
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-50"
        >
          📄 Download Report
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 rounded-xl bg-[#0B1628] p-5 text-cyan-400 animate-pulse">
          🤖 CyberVerse AI is analyzing your security logs...
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <AnalysisCard
          title="Attack Type"
          value={attackType}
        />

        <AnalysisCard
          title="Risk Score"
          value={riskScore}
        />

        <AnalysisCard
          title="MITRE ATT&CK"
          value={mitre}
        />

        <AnalysisCard
          title="Summary"
          value={
            summary ||
            "Run an analysis to view the attack summary."
          }
        />

        <AnalysisCard
          title="Recommendation"
          value={
            recommendation ||
            "Run an analysis to receive AI recommendations."
          }
        />

        <div className="rounded-xl bg-[#0B1628] p-5">
          <h3 className="font-bold text-cyan-400">
            Severity
          </h3>

          <div className="mt-4">
            <SeverityBadge level={severity} />
          </div>
        </div>
      </div>
            {/* AI Response */}
      {response && (
        <div className="mt-8 rounded-xl bg-[#0B1628] p-5">
          <h3 className="mb-4 text-xl font-bold text-cyan-400">
            🤖 AI Analysis
          </h3>

          <div className="whitespace-pre-wrap leading-7 text-gray-300">
            {response}
          </div>
        </div>
      )}

      {/* Attack Timeline */}
      <AttackTimeline events={timeline} />

      {/* Security Analytics */}
      <SecurityChart data={chartData} />
    </div>
  );
}

export default LogAnalyzer;