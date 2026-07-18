import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import { useAlert } from "../../context/AlertContext";
import { askGemini } from "../../services/gemini";

function AIThreatAdvisor() {
  const { selectedAlert } = useAlert();

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeThreat() {
    if (!selectedAlert) return;

    setLoading(true);

    try {
      const prompt = `
You are CyberVerse AI.

You are a Senior SOC Analyst.

Analyze the following cybersecurity incident professionally.

Incident:
${selectedAlert.title}

Severity:
${selectedAlert.severity}

Generate a professional report using the following sections.

Executive Summary

Risk Assessment

MITRE ATT&CK Mapping

Business Impact

Indicators of Compromise

Recommended Actions

Incident Response Steps

Keep the report concise, technical and enterprise-grade.
`;

      const result = await askGemini(prompt);

      setAnalysis(result);

    } catch (error) {

      console.error(error);

      setAnalysis(
        "❌ Unable to contact Gemini AI. Please verify your API key or internet connection."
      );

    }

    setLoading(false);
  }

  function downloadPDF() {
  if (!selectedAlert) return;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // =========================
  // Header
  // =========================

  doc.setFillColor(5, 18, 35);
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(0, 229, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);

  doc.text("CyberVerse AI", 20, 18);

  doc.setFontSize(12);

  doc.text(
    "Enterprise Security Operations Center",
    20,
    28
  );

  // =========================
  // Reset Text Color
  // =========================

  doc.setTextColor(0, 0, 0);

  // =========================
  // Report Title
  // =========================

  doc.setFontSize(18);
  doc.text("AI Threat Analysis Report", 20, 48);

  // =========================
  // Incident Details
  // =========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text("Incident Information", 20, 62);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text(`Incident : ${selectedAlert.title}`, 20, 72);

  doc.text(`Severity : ${selectedAlert.severity}`, 20, 80);

  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    20,
    88
  );

  // =========================
  // Divider
  // =========================

  doc.setDrawColor(0, 229, 255);
  doc.line(20, 95, 190, 95);

  // =========================
  // AI Report
  // =========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text("AI Analysis", 20, 108);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const report = doc.splitTextToSize(
    analysis || "No AI analysis available.",
    170
  );

  doc.text(report, 20, 118);

  // =========================
  // Footer
  // =========================

  doc.setDrawColor(200);
  doc.line(20, 280, 190, 280);

  doc.setFontSize(10);

  doc.setTextColor(100);

  doc.text(
    "Generated automatically by CyberVerse AI",
    20,
    287
  );

  doc.text(
    "Confidential Security Report",
    140,
    287
  );

  doc.save("CyberVerse_AI_Report.pdf");
}

  useEffect(() => {
    analyzeThreat();
  }, [selectedAlert]);

  if (!selectedAlert) {
    return (
      <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

        <h2 className="mb-6 text-2xl font-bold text-cyan-300">
          🤖 AI Threat Advisor
        </h2>

        <div className="flex h-72 items-center justify-center rounded-xl bg-[#0B1628] text-center text-gray-400">

          Select an alert from the Alert Center to generate an AI-powered threat analysis.

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        🤖 AI Threat Advisor
      </h2>
            <div className="space-y-6">

        {/* Selected Incident */}

        <div className="rounded-xl border border-cyan-500/10 bg-[#0B1628] p-5">

          <h3 className="mb-3 text-lg font-bold text-cyan-400">
            🚨 Selected Incident
          </h3>

          <h4 className="text-xl font-semibold text-white">
            {selectedAlert.title}
          </h4>

          <div className="mt-5 flex flex-wrap gap-3">

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                selectedAlert.severity === "Critical"
                  ? "bg-red-500/20 text-red-400"
                  : selectedAlert.severity === "High"
                  ? "bg-orange-500/20 text-orange-400"
                  : selectedAlert.severity === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              Severity: {selectedAlert.severity}
            </span>

            <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
              🤖 Powered by Gemini AI
            </span>

          </div>

        </div>

        {/* AI Threat Report */}

        <div className="rounded-xl border border-cyan-500/10 bg-[#0B1628] p-5">

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-xl font-bold text-cyan-400">
              🧠 AI Threat Report
            </h3>

            <button
              onClick={() => navigator.clipboard.writeText(analysis)}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              📋 Copy Report
            </button>

          </div>

          {loading ? (

            <div className="flex h-72 items-center justify-center">

              <div className="text-center">

                <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>

                <p className="text-lg text-cyan-400">
                  Gemini AI is analyzing the incident...
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Executive Summary • Risk Assessment • MITRE ATT&CK • IOC Analysis
                </p>

              </div>

            </div>

          ) : (

            <div className="max-h-[500px] overflow-y-auto rounded-xl border border-cyan-500/10 bg-[#081221] p-5">

              <pre className="whitespace-pre-wrap font-sans leading-7 text-gray-300">
                {analysis}
              </pre>

            </div>

          )}

        </div>
                {/* Action Buttons */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Regenerate Analysis */}

          <button
            onClick={analyzeThreat}
            disabled={loading}
            className="rounded-xl bg-cyan-500 py-3 text-lg font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "⏳ Generating..." : "🔄 Regenerate Analysis"}
          </button>

          {/* Download PDF */}

          <button
            onClick={downloadPDF}
            disabled={!analysis || loading}
            className="rounded-xl border border-cyan-500 py-3 text-lg font-bold text-cyan-400 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            📄 Download PDF
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIThreatAdvisor;