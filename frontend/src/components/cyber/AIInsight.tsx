import { useCyber } from "../../context/CyberContext";

function AIInsight() {
  const { selectedAttack } = useCyber();

  if (!selectedAttack) {
    return (
      <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          🤖 AI Security Copilot
        </h2>

        <p className="mt-6 text-gray-400">
          Select an attack to begin AI analysis.
        </p>
      </div>
    );
  }

  const recommendations: Record<string, string> = {
    "SQL Injection":
      "Use prepared statements, parameterized queries, and validate all user inputs before interacting with the database.",

    "DDoS Attack":
      "Enable CDN protection, rate limiting, Web Application Firewall (WAF), and traffic filtering.",

    Phishing:
      "Enable MFA, email filtering, and regular user awareness training.",

    "Brute Force":
      "Enable account lockout, CAPTCHA, MFA, and strong password policies.",
  };

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="text-2xl font-bold text-cyan-400">
        🤖 AI Security Copilot
      </h2>

      <div className="mt-6">

        <p className="text-xl font-semibold text-white">
          {selectedAttack.name}
        </p>

        <p className="mt-2 text-gray-400">
          Source: {selectedAttack.source}
        </p>

        <p className="text-gray-400">
          Target: {selectedAttack.target}
        </p>

        <p className="mt-6 text-green-400 font-semibold">
          AI Recommendation
        </p>

        <p className="mt-2 text-gray-300 leading-7">
          {recommendations[selectedAttack.name] ??
            "No recommendation available."}
        </p>

      </div>

    </div>
  );
}

export default AIInsight;