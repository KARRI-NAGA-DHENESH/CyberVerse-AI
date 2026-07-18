import { useState } from "react";
import { askGemini } from "../../services/gemini";

function CVESearch() {
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [severity, setSeverity] = useState("");

  const [cvss, setCvss] = useState("");

  const [published, setPublished] = useState("");

  const [vendor, setVendor] = useState("");

  const [product, setProduct] = useState("");

  const [version, setVersion] = useState("");

  const [cwe, setCwe] = useState("");

  const [attackVector, setAttackVector] = useState("");

  const [exploited, setExploited] = useState("");

  const [mitre, setMitre] = useState("");

  const [epss, setEpss] = useState("");

  const [cisaKev, setCisaKev] = useState("");

  const [references, setReferences] = useState<string[]>([]);

  const [description, setDescription] = useState("");

  const [mitigation, setMitigation] = useState("");

  async function searchCVE() {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const prompt = `
You are an expert Cyber Security Analyst.

Return ONLY valid JSON.

{
  "severity":"",
  "cvss":"",
  "published":"",
  "vendor":"",
  "product":"",
  "version":"",
  "cwe":"",
  "attackVector":"",
  "exploited":"",
  "mitre":"",
  "epss":"",
  "cisaKev":"",
  "references":[],
  "description":"",
  "mitigation":""
}

Explain this CVE:

${query}
`;

      const result = await askGemini(prompt);

      const cleaned = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleaned);

      setSeverity(data.severity || "");

      setCvss(data.cvss || "");

      setPublished(data.published || "");

      setVendor(data.vendor || "");

      setProduct(data.product || "");

      setVersion(data.version || "");

      setCwe(data.cwe || "");

      setAttackVector(data.attackVector || "");

      setExploited(data.exploited || "");

      setMitre(data.mitre || "");

      setEpss(data.epss || "");

      setCisaKev(data.cisaKev || "");

      setReferences(data.references || []);

      setDescription(data.description || "");

      setMitigation(data.mitigation || "");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }
    return (
    <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🔍 CVE Search
      </h2>

      <div className="flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter CVE ID (Example: CVE-2024-3400)"
          className="flex-1 rounded-lg border border-cyan-500/20 bg-[#081221] p-3 text-white outline-none"
        />

        <button
          onClick={searchCVE}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>

      </div>

      {loading && (

        <div className="mt-6 rounded-xl bg-[#0B1628] p-5 text-cyan-400 animate-pulse">

          🤖 CyberVerse AI is analyzing vulnerability...

        </div>

      )}

      {severity && (

        <div className="mt-8 rounded-xl bg-[#0B1628] p-6">

          <h3 className="text-2xl font-bold text-cyan-400">
            {query}
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Severity</p>
              <h3 className="text-xl font-bold text-red-400">
                {severity}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">CVSS Score</p>
              <h3 className="text-xl font-bold text-yellow-400">
                {cvss}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Published</p>
              <h3 className="font-bold text-white">
                {published}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Vendor</p>
              <h3 className="font-bold text-white">
                {vendor}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Product</p>
              <h3 className="font-bold text-white">
                {product}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Version</p>
              <h3 className="font-bold text-white">
                {version}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">CWE</p>
              <h3 className="font-bold text-white">
                {cwe}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Attack Vector</p>
              <h3 className="font-bold text-white">
                {attackVector}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">Known Exploited</p>
              <h3 className="font-bold text-red-400">
                {exploited}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">MITRE ATT&CK</p>
              <h3 className="font-bold text-cyan-400">
                {mitre}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">EPSS Score</p>
              <h3 className="font-bold text-yellow-400">
                {epss}
              </h3>
            </div>

            <div className="rounded-lg bg-[#07111F] p-4">
              <p className="text-gray-400">CISA KEV</p>
              <h3 className="font-bold text-red-400">
                {cisaKev}
              </h3>
            </div>

          </div>
                    <div className="mt-8 rounded-lg bg-[#07111F] p-5">
            <h3 className="mb-3 text-xl font-bold text-cyan-400">
              📝 Description
            </h3>

            <p className="leading-7 text-gray-300">
              {description}
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-[#07111F] p-5">
            <h3 className="mb-3 text-xl font-bold text-green-400">
              🛡 Mitigation
            </h3>

            <p className="leading-7 text-gray-300">
              {mitigation}
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-[#07111F] p-5">
            <h3 className="mb-4 text-xl font-bold text-cyan-400">
              🌐 References
            </h3>

            {references.length === 0 ? (
              <p className="text-gray-400">
                No references available.
              </p>
            ) : (
              <ul className="space-y-3">
                {references.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-cyan-400 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

      )}
          </div>
  );
}

export default CVESearch;