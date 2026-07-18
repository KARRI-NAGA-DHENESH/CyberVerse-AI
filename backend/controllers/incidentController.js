// =====================================
// CyberVerse AI
// Incident Controller
// =====================================

const incidents = [
  {
    id: 1,
    title: "Ransomware Infection",
    severity: "Critical",
    status: "Investigating",
    source: "Russia",
    target: "Finance Server",
    description:
      "Multiple endpoints detected ransomware encryption activity.",
    analyst: "AI Copilot",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Credential Theft",
    severity: "High",
    status: "Contained",
    source: "China",
    target: "HR Portal",
    description:
      "Suspicious login attempts using leaked credentials.",
    analyst: "SOC Team",
    createdAt: new Date().toISOString(),
  },
];

const getAllIncidents = (req, res) => {
  res.status(200).json({
    success: true,
    count: incidents.length,
    incidents,
  });
};

module.exports = {
  getAllIncidents,
};