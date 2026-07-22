const { lookupVirusTotal } = require("../services/virusTotalService");
const { lookupAbuseIPDB } = require("../services/abuseIPDBService");
const { lookupOTX } = require("../services/otxService");

async function lookupThreat(req, res) {
  const { ip } = req.params;

  let virusTotal = null;
  let abuseIPDB = null;
  let otx = null;

  try {
    virusTotal = await lookupVirusTotal(ip);
  } catch (error) {
    console.error("VirusTotal Error:", error.message);
  }

  try {
    abuseIPDB = await lookupAbuseIPDB(ip);
  } catch (error) {
    console.error("AbuseIPDB Error:", error.message);
  }

  try {
    otx = await lookupOTX(ip);
  } catch (error) {
    console.error("OTX Error:", error.message);
  }

  res.json({
    success: true,
    virusTotal,
    abuseIPDB,
    otx,
  });
}

module.exports = {
  lookupThreat,
};