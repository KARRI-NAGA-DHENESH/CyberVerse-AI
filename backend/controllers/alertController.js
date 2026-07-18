// =======================================
// CyberVerse AI
// Alert Controller
// =======================================

const alerts = [
  {
    id: 1,
    title: "Critical Ransomware Activity",
    severity: "Critical",
    source: "Russia",
    status: "Active",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Phishing Campaign Detected",
    severity: "High",
    source: "China",
    status: "Investigating",
    time: "5 min ago",
  },
  {
    id: 3,
    title: "DDoS Traffic Spike",
    severity: "Medium",
    source: "Iran",
    status: "Mitigated",
    time: "12 min ago",
  },
  {
    id: 4,
    title: "Malware Beaconing",
    severity: "Critical",
    source: "North Korea",
    status: "Blocked",
    time: "18 min ago",
  },
];

const getAllAlerts = (req, res) => {
  res.status(200).json({
    success: true,
    count: alerts.length,
    alerts,
  });
};

module.exports = {
  getAllAlerts,
};