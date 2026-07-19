import { useEffect, useState } from "react";
import { useAlert } from "../../context/AlertContext";

function IncidentDetails() {
  const { selectedAlert } = useAlert();
  const [incidents, setIncidents] = useState<any[]>([]);
  useEffect(() => {
  fetch(`${import.meta.env.VITE_BACKEND_API}/api/incidents`)
    .then((res) => res.json())
    .then((data) => {
      setIncidents(data.incidents);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

  const incidentData: Record<
    string,
    {
      mitre: string;
      cvss: string;
      asset: string;
      iocs: string[];
      actions: string[];
      summary: string;
    }
  > = {
    "SQL Injection Detected": {
      mitre: "T1190",
      cvss: "9.8 Critical",
      asset: "Production Web Server",
      iocs: [
        "SQL syntax errors",
        "Privilege escalation",
        "Unexpected database queries",
        "Large data export",
      ],
      actions: [
        "Block attacker IP",
        "Enable WAF rules",
        "Patch vulnerable endpoint",
        "Review database logs",
      ],
      summary:
        "A high-confidence SQL Injection attack targeting the production application. Immediate containment is recommended.",
    },

    "DDoS Traffic Spike": {
      mitre: "T1498",
      cvss: "8.7 High",
      asset: "Edge Firewall",
      iocs: [
        "Traffic spike",
        "Packet flood",
        "High bandwidth usage",
      ],
      actions: [
        "Enable CDN",
        "Rate limiting",
        "Traffic filtering",
        "Auto scaling",
      ],
      summary:
        "Distributed Denial-of-Service traffic detected against public-facing services.",
    },

    "Suspicious Login Attempt": {
      mitre: "T1110",
      cvss: "7.2 Medium",
      asset: "Active Directory",
      iocs: [
        "Repeated failed logins",
        "Unknown IP address",
        "Password spraying",
      ],
      actions: [
        "Enable MFA",
        "Reset compromised credentials",
        "Investigate user account",
      ],
      summary:
        "Possible credential attack detected against privileged accounts.",
    },

    "Port Scan Detected": {
      mitre: "T1046",
      cvss: "5.3 Low",
      asset: "Internal Network",
      iocs: [
        "Sequential port probes",
        "Network enumeration",
      ],
      actions: [
        "Block scanner IP",
        "Increase monitoring",
      ],
      summary:
        "Reconnaissance activity detected on internal network segments.",
    },

    "Ransomware Behavior": {
      mitre: "T1486",
      cvss: "10.0 Critical",
      asset: "Finance File Server",
      iocs: [
        "Mass file encryption",
        "Shadow copy deletion",
        "High disk activity",
      ],
      actions: [
        "Isolate infected endpoint",
        "Disconnect network",
        "Restore backups",
        "Run EDR investigation",
      ],
      summary:
        "Potential ransomware execution detected. Immediate isolation is required.",
    },
  };

  if (!selectedAlert) {
    return (
      <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">
        <h2 className="mb-6 text-2xl font-bold text-cyan-300">
          📝 Incident Details
        </h2>

        <div className="flex h-64 items-center justify-center text-center text-gray-400">
          Select an alert from the Alert Center to view incident details.
        </div>
      </div>
    );
  }

  const backendIncident = incidents.find(
  (incident) =>
    incident.title
      .toLowerCase()
      .includes(selectedAlert.title.toLowerCase()) ||
    selectedAlert.title
      .toLowerCase()
      .includes(incident.title.toLowerCase())
);

const details =
  incidentData[selectedAlert.title] ||
  incidentData[backendIncident?.title];

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        📝 Incident Details
      </h2>

      <div className="space-y-5">
                <div>
          <p className="text-gray-400">
            Incident
          </p>

          <h3 className="text-xl font-bold text-white">
            {selectedAlert.title}
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            Severity
          </p>

          <h3
            className={`text-lg font-bold ${
              selectedAlert.severity === "Critical"
                ? "text-red-400"
                : selectedAlert.severity === "High"
                ? "text-orange-400"
                : selectedAlert.severity === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {selectedAlert.severity}
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            MITRE ATT&CK
          </p>

          <h3 className="text-cyan-400">
            {details?.mitre}
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            CVSS Score
          </p>

          <h3 className="text-yellow-400">
            {details?.cvss}
          </h3>
        </div>

        <div>
          <p className="text-gray-400">
            Affected Asset
          </p>

          <h3 className="text-white">
            {details?.asset}
          </h3>
        </div>

        <div>
          <p className="mb-2 text-gray-400">
            Indicators of Compromise
          </p>

          <ul className="space-y-2 text-gray-300">
            {details?.iocs.map((ioc) => (
              <li key={ioc}>• {ioc}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-gray-400">
            Recommended Actions
          </p>

          <ul className="space-y-2 text-gray-300">
            {details?.actions.map((action) => (
              <li key={action}>✅ {action}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-cyan-500/10 bg-[#0B1628] p-5">

          <h3 className="mb-3 text-lg font-bold text-cyan-400">
            🤖 AI Incident Summary
          </h3>

          <p className="leading-7 text-gray-300">
            {details?.summary}
          </p>

        </div>

      </div>

    </div>
  );
}

export default IncidentDetails;