// ======================================
// CyberVerse AI
// AI Investigation Controller
// ======================================

const getInvestigation = (req, res) => {
  res.json({
    success: true,
    report: {
      riskScore: 61,
      riskLevel: "Medium",

      executiveSummary:
        "AI has detected a coordinated ransomware campaign targeting enterprise assets. Immediate containment is recommended.",

      recommendations: [
        "Isolate affected endpoint",
        "Block malicious IP addresses",
        "Reset compromised credentials",
        "Run full malware scan",
        "Review firewall logs",
      ],
    },
  });
};

module.exports = {
  getInvestigation,
};