const { lookupVirusTotal } = require("../services/virusTotalService");
const { lookupAbuseIPDB } = require("../services/abuseIPDBService");
const { lookupOTX } = require("../services/otxService");

async function lookupThreat(req, res) {
  try {
    const { ip } = req.params;

    const [virusTotal, abuseIPDB, otx] = await Promise.all([
      lookupVirusTotal(ip),
      lookupAbuseIPDB(ip),
      lookupOTX(ip),
    ]);

    res.json({
      success: true,
      virusTotal,
      abuseIPDB,
      otx,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: "Threat lookup failed",
    });
  }
}

module.exports = {
  lookupThreat,
};