// ===============================
// CyberVerse AI
// Attack Controller
// ===============================

const attacks = [
  {
    id: 1,
    source: "Russia",
    target: "Germany",
    type: "Ransomware",
    severity: "Critical",
    status: "Blocked",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    source: "China",
    target: "India",
    type: "Phishing",
    severity: "High",
    status: "Investigating",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    source: "North Korea",
    target: "USA",
    type: "Malware",
    severity: "Critical",
    status: "Active",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    source: "Iran",
    target: "France",
    type: "DDoS",
    severity: "Medium",
    status: "Mitigated",
    timestamp: new Date().toISOString(),
  },
];

const getAllAttacks = (req, res) => {
  res.status(200).json({
    success: true,
    count: attacks.length,
    attacks,
  });
};

module.exports = {
  getAllAttacks,
};