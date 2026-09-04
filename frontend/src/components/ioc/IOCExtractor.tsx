import { useState } from "react";
import { askGemini } from "../../services/gemini";
import { buildIOCList } from "../../utils/iocExport";
import { saveRiskSignals } from "../../services/riskSignalService";

function IOCExtractor() {
  const [text, setText] = useState("");

  const [ips, setIps] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [md5s, setMd5s] = useState<string[]>([]);
  const [sha1s, setSha1s] = useState<string[]>([]);
  const [sha256s, setSha256s] = useState<string[]>([]);

  const [threatLevel, setThreatLevel] = useState("");
  const [summary, setSummary] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const [loading, setLoading] = useState(false);

  const totalHashes =
    md5s.length +
    sha1s.length +
    sha256s.length;

  const totalIOCs =
    ips.length +
    domains.length +
    urls.length +
    emails.length +
    totalHashes;

    const threatExposure = Math.min(
  100,
  totalIOCs * 10
);

saveRiskSignals({
  threatExposure,
});

  async function extractIOCs() {
    setLoading(true);

    const extractedIps =
      text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];

    const extractedDomains =
      text.match(
        /\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b/g
      ) || [];

    const extractedUrls =
      text.match(/https?:\/\/[^\s]+/g) || [];

    const extractedEmails =
      text.match(
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g
      ) || [];

    const extractedMd5 =
      text.match(/\b[a-fA-F0-9]{32}\b/g) || [];

    const extractedSha1 =
      text.match(/\b[a-fA-F0-9]{40}\b/g) || [];

    const extractedSha256 =
      text.match(/\b[a-fA-F0-9]{64}\b/g) || [];

    setIps(extractedIps);
    setDomains(extractedDomains);
    setUrls(extractedUrls);
    setEmails(extractedEmails);
    setMd5s(extractedMd5);
    setSha1s(extractedSha1);
    setSha256s(extractedSha256);

    try {
      const prompt = `
You are a SOC Threat Intelligence Analyst.

Return ONLY valid JSON.

{
  "threatLevel":"",
  "summary":"",
  "recommendation":""
}

Analyze these Indicators of Compromise.

IPs:
${extractedIps.join(", ")}

Domains:
${extractedDomains.join(", ")}

URLs:
${extractedUrls.join(", ")}

Emails:
${extractedEmails.join(", ")}

MD5:
${extractedMd5.join(", ")}

SHA1:
${extractedSha1.join(", ")}

SHA256:
${extractedSha256.join(", ")}
`;

      const result = await askGemini(prompt);

      const cleaned = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleaned);

      setThreatLevel(data.threatLevel || "Unknown");
      setSummary(data.summary || "");
      setRecommendation(data.recommendation || "");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  function exportCSV() {
    const rows = buildIOCList({
      ips,
      domains,
      urls,
      emails,
      md5s,
      sha1s,
      sha256s,
    });

    const csv =
      "Type,Value\n" +
      rows.join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "ioc-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  async function copyIOCs() {
    const rows = buildIOCList({
      ips,
      domains,
      urls,
      emails,
      md5s,
      sha1s,
      sha256s,
    });

    await navigator.clipboard.writeText(
      rows.join("\n")
    );

    alert("IOCs copied to clipboard.");
  }

  return (
    <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🔍 IOC Extractor
      </h2>

      <textarea
        rows={10}
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Paste security logs here..."
        className="w-full rounded-xl border border-cyan-500/20 bg-[#081221] p-4 text-white outline-none"
      />
            <div className="mt-5 flex flex-wrap gap-4">

        <button
          onClick={extractIOCs}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"
        >
          🔍 Extract & Analyze IOCs
        </button>

        <button
          onClick={exportCSV}
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-black hover:bg-green-400"
        >
          📊 Export CSV
        </button>

        <button
          onClick={copyIOCs}
          className="rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white hover:bg-purple-400"
        >
          📋 Copy IOCs
        </button>

      </div>

      {loading && (

        <div className="mt-5 rounded-xl bg-[#0B1628] p-5 text-cyan-400 animate-pulse">

          🤖 CyberVerse AI is analyzing Indicators of Compromise...

        </div>

      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-xl bg-[#0B1628] p-5">
          <p className="text-gray-400">
            🌐 IP Addresses
          </p>

          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            {ips.length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#0B1628] p-5">
          <p className="text-gray-400">
            🌍 Domains
          </p>

          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            {domains.length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#0B1628] p-5">
          <p className="text-gray-400">
            🔗 URLs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            {urls.length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#0B1628] p-5">
          <p className="text-gray-400">
            📧 Emails
          </p>

          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            {emails.length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#0B1628] p-5">
          <p className="text-gray-400">
            🔑 Hashes
          </p>

          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            {totalHashes}
          </h2>
        </div>

        <div className="rounded-xl bg-[#0B1628] p-5">
          <p className="text-gray-400">
            📊 Total IOCs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {totalIOCs}
          </h2>
        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-[#0B1628] p-4">
          <h3 className="font-bold text-cyan-400">
            🌐 IP Addresses
          </h3>

          {ips.length ? (
            ips.map((ip, index) => (
              <p
                key={index}
                className="mt-2 text-gray-300"
              >
                {ip}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>

        <div className="rounded-xl bg-[#0B1628] p-4">
          <h3 className="font-bold text-cyan-400">
            🌍 Domains
          </h3>

          {domains.length ? (
            domains.map((domain, index) => (
              <p
                key={index}
                className="mt-2 text-gray-300"
              >
                {domain}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>

        <div className="rounded-xl bg-[#0B1628] p-4">
          <h3 className="font-bold text-cyan-400">
            🔗 URLs
          </h3>

          {urls.length ? (
            urls.map((url, index) => (
              <p
                key={index}
                className="mt-2 break-all text-gray-300"
              >
                {url}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>

        <div className="rounded-xl bg-[#0B1628] p-4">
          <h3 className="font-bold text-cyan-400">
            📧 Email Addresses
          </h3>

          {emails.length ? (
            emails.map((email, index) => (
              <p
                key={index}
                className="mt-2 text-gray-300"
              >
                {email}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>

        <div className="rounded-xl bg-[#0B1628] p-4">
          <h3 className="font-bold text-cyan-400">
            🔑 MD5 Hashes
          </h3>

          {md5s.length ? (
            md5s.map((hash, index) => (
              <p
                key={index}
                className="mt-2 break-all text-gray-300"
              >
                {hash}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>

        <div className="rounded-xl bg-[#0B1628] p-4">
          <h3 className="font-bold text-cyan-400">
            🔑 SHA1 Hashes
          </h3>

          {sha1s.length ? (
            sha1s.map((hash, index) => (
              <p
                key={index}
                className="mt-2 break-all text-gray-300"
              >
                {hash}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>
                <div className="rounded-xl bg-[#0B1628] p-4 md:col-span-2">
          <h3 className="font-bold text-cyan-400">
            🔑 SHA256 Hashes
          </h3>

          {sha256s.length ? (
            sha256s.map((hash, index) => (
              <p
                key={index}
                className="mt-2 break-all text-gray-300"
              >
                {hash}
              </p>
            ))
          ) : (
            <p className="mt-2 text-gray-500">
              None Found
            </p>
          )}
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-[#0B1628] p-6">

        <h2 className="mb-5 text-2xl font-bold text-cyan-400">
          🤖 AI Threat Assessment
        </h2>

        <div className="space-y-6">

          <div>
            <h3 className="text-lg font-bold text-red-400">
              🚨 Threat Level
            </h3>

            <p
              className={`mt-2 text-xl font-bold ${
                threatLevel.toLowerCase() === "critical"
                  ? "text-red-500"
                  : threatLevel.toLowerCase() === "high"
                  ? "text-orange-400"
                  : threatLevel.toLowerCase() === "medium"
                  ? "text-yellow-400"
                  : threatLevel.toLowerCase() === "low"
                  ? "text-green-400"
                  : "text-white"
              }`}
            >
              {threatLevel || "Not analyzed"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-cyan-400">
              📝 AI Summary
            </h3>

            <p className="mt-2 leading-7 text-gray-300">
              {summary ||
                "Run IOC extraction to generate an AI security assessment."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-400">
              🛡 Recommended Actions
            </h3>

            <p className="mt-2 leading-7 text-gray-300">
              {recommendation ||
                "CyberVerse AI will recommend containment and investigation steps."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default IOCExtractor;