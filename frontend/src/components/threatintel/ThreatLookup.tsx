import { useEffect, useState } from "react";

import ThreatScore from "./ThreatScore";
import IPLocationCard from "./IPLocationCard";
import ThreatHistory from "./ThreatHistory";
import ThreatGauge from "./ThreatGauge";
import KPICard from "./KPICard";

import { generateThreatReport } from "../../utils/pdfReport";

function ThreatLookup() {
  const [ip, setIp] = useState("");

  const [vtData, setVtData] = useState<any>(null);
  const [abuseData, setAbuseData] = useState<any>(null);
  const [otxData, setOtxData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [showRawData, setShowRawData] = useState(false);
  const [history, setHistory] = useState<
  {
    ip: string;
    threatLevel: string;
    threatScore: number;
    time: string;
  }[]
>([]);
useEffect(() => {
  const savedHistory = localStorage.getItem("threatHistory");

  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "threatHistory",
    JSON.stringify(history)
  );
}, [history]);
function clearHistory() {
  setHistory([]);

  localStorage.removeItem("threatHistory");
}

  async function lookup() {
    if (!ip.trim()) return;

    setLoading(true);

    setError("");

    setVtData(null);
    setAbuseData(null);
    setOtxData(null);

    try {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/api/threat/${ip}`
  );

      const data = await response.json();

      if (!data.success) {
        throw new Error("Threat lookup failed");
      }

      setVtData(data.virusTotal);
      setAbuseData(data.abuseIPDB);
      setOtxData(data.otx);
      const vtStats =
  data.virusTotal?.data?.attributes?.last_analysis_stats;

const abuse =
  data.abuseIPDB?.data;

const pulseCount =
  data.otx?.pulse_info?.count ?? 0;

const level =
  (vtStats?.malicious ?? 0) >= 10 ||
  (abuse?.abuseConfidenceScore ?? 0) >= 80
    ? "HIGH"
    : (vtStats?.malicious ?? 0) >= 3 ||
      (abuse?.abuseConfidenceScore ?? 0) >= 40
    ? "MEDIUM"
    : "LOW";

const score = Math.min(
  100,
  (vtStats?.malicious ?? 0) * 10 +
    (abuse?.abuseConfidenceScore ?? 0) +
    pulseCount * 2
);

setHistory((prev) =>
  [
    {
      ip,
      threatLevel: level,
      threatScore: score,
      time: new Date().toLocaleTimeString(),
    },
    ...prev,
  ].slice(0, 20)
);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to fetch Threat Intelligence from CyberVerse Backend."
      );
    }

    setLoading(false);
  }

  const vtStats =
    vtData?.data?.attributes?.last_analysis_stats;

  const abuse =
    abuseData?.data;

  const pulseCount =
    otxData?.pulse_info?.count ?? 0;

  const country =
    otxData?.country_name ??
    abuse?.countryCode ??
    "Unknown";

  const isp =
    abuse?.isp ??
    "Unknown";

  const asn =
    otxData?.asn ??
    "Unknown";

  const latitude =
    otxData?.latitude ?? 0;

  const longitude =
    otxData?.longitude ?? 0;

  const threatLevel =
    (vtStats?.malicious ?? 0) >= 10 ||
    (abuse?.abuseConfidenceScore ?? 0) >= 80
      ? "HIGH"
      : (vtStats?.malicious ?? 0) >= 3 ||
        (abuse?.abuseConfidenceScore ?? 0) >= 40
      ? "MEDIUM"
      : "LOW";

  const threatScore = Math.min(
    100,
    (vtStats?.malicious ?? 0) * 10 +
      (abuse?.abuseConfidenceScore ?? 0) +
      pulseCount * 2
  );
  const maliciousCount = vtStats?.malicious ?? 0;
const harmlessCount = vtStats?.harmless ?? 0;

const averageScore = Math.round(
  (
    ((abuse?.abuseConfidenceScore ?? 0) +
      maliciousCount * 10) / 2
  )
);

  function downloadReport() {
    generateThreatReport({
      ip,

      threatLevel,

      threatScore,

      malicious: vtStats?.malicious ?? 0,
      suspicious: vtStats?.suspicious ?? 0,
      harmless: vtStats?.harmless ?? 0,
      undetected: vtStats?.undetected ?? 0,

      abuseScore: abuse?.abuseConfidenceScore ?? 0,
      totalReports: abuse?.totalReports ?? 0,

      pulses: pulseCount,

      country,

      isp,

      asn,
    });
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🌐 Threat Intelligence Center
      </h2>

      <input
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter IP Address..."
        className="w-full rounded-xl border border-cyan-500/20 bg-[#081221] p-4 text-white outline-none"
      />

      <button
        onClick={lookup}
        disabled={loading}
        className="mt-5 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        🔍 Lookup Threat Intelligence
      </button>

      {loading && (
        <div className="mt-6 rounded-xl bg-[#0B1628] p-5 text-cyan-400 animate-pulse">
          Contacting CyberVerse AI Backend...
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-900/30 p-5 text-red-400">
          {error}
        </div>
      )}

      {(vtData || abuseData || otxData) && (
        <>
        {/* Executive Dashboard */}

<div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

  <KPICard
    title="Threat Score"
    value={`${threatScore}%`}
    color="#06B6D4"
    icon="🎯"
  />

  <KPICard
    title="Malicious Detections"
    value={maliciousCount}
    color="#EF4444"
    icon="🚨"
  />

  <KPICard
    title="Safe Engines"
    value={harmlessCount}
    color="#22C55E"
    icon="🛡"
  />

  <KPICard
    title="Average Risk"
    value={`${averageScore}%`}
    color="#FACC15"
    icon="📈"
  />

</div>
                  {/* Overall Threat */}
          <div className="mt-8 rounded-xl bg-[#0B1628] p-6">
            <h3 className="text-xl font-bold text-cyan-400">
              🚨 Overall Threat Assessment
            </h3>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg text-gray-300">
                Threat Level
              </span>

              <span
                className={`rounded-lg px-5 py-2 text-lg font-bold ${
                  threatLevel === "HIGH"
                    ? "bg-red-500 text-white"
                    : threatLevel === "MEDIUM"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-black"
                }`}
              >
                {threatLevel}
              </span>
            </div>
          </div>
          <div className="mt-8">
  <ThreatGauge score={threatScore} />
</div>

          {/* Threat Score */}
          <div className="mt-6">
            <ThreatScore score={threatScore} />
          </div>

          {/* IP Geolocation */}
          <div className="mt-6">
            <IPLocationCard
              country={country}
              isp={isp}
              asn={asn}
              latitude={latitude}
              longitude={longitude}
            />
          </div>

          {/* Download Report */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={downloadReport}
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              📄 Download Threat Report
            </button>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* VirusTotal */}
            <div className="rounded-xl bg-[#0B1628] p-5">
              <h3 className="mb-4 text-lg font-bold text-cyan-400">
                🛡 VirusTotal
              </h3>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-400">Malicious</span>

                  <span className="font-bold text-red-400">
                    {vtStats?.malicious ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Suspicious</span>

                  <span className="font-bold text-yellow-400">
                    {vtStats?.suspicious ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Harmless</span>

                  <span className="font-bold text-green-400">
                    {vtStats?.harmless ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Undetected</span>

                  <span className="font-bold text-cyan-400">
                    {vtStats?.undetected ?? 0}
                  </span>
                </div>

              </div>
            </div>

            {/* AbuseIPDB */}
            <div className="rounded-xl bg-[#0B1628] p-5">
              <h3 className="mb-4 text-lg font-bold text-cyan-400">
                🚨 AbuseIPDB
              </h3>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Abuse Score
                  </span>

                  <span className="font-bold text-red-400">
                    {abuse?.abuseConfidenceScore ?? 0}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Reports
                  </span>

                  <span className="font-bold text-orange-400">
                    {abuse?.totalReports ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Country
                  </span>

                  <span className="font-bold text-white">
                    {abuse?.countryCode ?? "Unknown"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    ISP
                  </span>

                  <span className="font-bold text-white">
                    {abuse?.isp ?? "Unknown"}
                  </span>
                </div>

              </div>
            </div>

            {/* AlienVault OTX */}
            <div className="rounded-xl bg-[#0B1628] p-5">
              <h3 className="mb-4 text-lg font-bold text-cyan-400">
                👽 AlienVault OTX
              </h3>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Threat Pulses
                  </span>

                  <span className="font-bold text-purple-400">
                    {pulseCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Country
                  </span>

                  <span className="font-bold text-white">
                    {country}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    ASN
                  </span>

                  <span className="font-bold text-white">
                    {asn}
                  </span>
                </div>

              </div>
            </div>

          </div>
                    {/* AI Security Summary */}
          <div className="mt-8 rounded-xl bg-[#0B1628] p-6">
            <h3 className="mb-4 text-xl font-bold text-cyan-400">
              🤖 AI Security Summary
            </h3>

            <p className="leading-8 text-gray-300">
              {threatLevel === "HIGH"
                ? "CyberVerse AI has classified this IP as HIGH RISK. Multiple threat intelligence providers indicate malicious behavior. Immediate containment, firewall blocking, SIEM correlation, endpoint investigation, and IOC hunting are strongly recommended."
                : threatLevel === "MEDIUM"
                ? "This IP exhibits moderate risk indicators. Some security vendors have reported suspicious activity. Review endpoint logs, inspect firewall events, and continue monitoring before allowing unrestricted communication."
                : "No significant malicious indicators were found across the available intelligence providers. Continue routine monitoring and periodically re-evaluate the IP as threat intelligence changes over time."}
            </p>
          </div>

          {/* Intelligence Summary */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <div className="rounded-xl bg-[#0B1628] p-6">
              <h3 className="mb-5 text-xl font-bold text-cyan-400">
                📊 Intelligence Summary
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Threat Score
                  </span>

                  <span className="font-bold text-cyan-400">
                    {threatScore}/100
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    VirusTotal Malicious
                  </span>

                  <span className="font-bold text-red-400">
                    {vtStats?.malicious ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Abuse Confidence
                  </span>

                  <span className="font-bold text-orange-400">
                    {abuse?.abuseConfidenceScore ?? 0}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    OTX Pulses
                  </span>

                  <span className="font-bold text-purple-400">
                    {pulseCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Country
                  </span>

                  <span className="font-bold text-white">
                    {country}
                  </span>
                </div>

              </div>
            </div>

            <div className="rounded-xl bg-[#0B1628] p-6">
              <h3 className="mb-5 text-xl font-bold text-green-400">
                🛡 Recommended Actions
              </h3>

              <ul className="space-y-3 text-gray-300">

                <li>✅ Review Firewall Logs</li>

                <li>✅ Correlate SIEM Events</li>

                <li>✅ Investigate Endpoint Activity</li>

                <li>✅ Search for Matching IOCs</li>

                <li>✅ Verify Network Connections</li>

                <li>✅ Block IP if Confirmed Malicious</li>

                <li>✅ Continue Continuous Monitoring</li>

              </ul>
            </div>

          </div>

                  {/* Threat Intelligence Details */}
          <div className="mt-8 rounded-xl bg-[#0B1628] p-6">

            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex w-full items-center justify-between rounded-xl bg-[#081221] p-4 transition hover:bg-[#0D1B31]"
            >
              <h3 className="text-xl font-bold text-cyan-400">
                📋 Raw Threat Intelligence
              </h3>

              <span className="font-bold text-cyan-400">
                {showRawData ? "▲ Hide" : "▼ Show"}
              </span>
            </button>

            {showRawData && (
              <div className="mt-5">

                <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap rounded-lg bg-[#081221] p-4 text-sm text-gray-300">

{JSON.stringify(
{
  VirusTotal: vtData,
  AbuseIPDB: abuseData,
  AlienVaultOTX: otxData,
},
null,
2
)}

                </pre>

              </div>
            )}

          </div>

          {/* Threat Investigation History */}
          <div className="mt-8">
            <ThreatHistory
              history={history}
              clearHistory={clearHistory}
            />
          </div>

        </>
      )}
    </div>
  );
}

export default ThreatLookup;