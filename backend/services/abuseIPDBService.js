const axios = require("axios");

async function lookupAbuseIPDB(ip) {
  const response = await axios.get(
    "https://api.abuseipdb.com/api/v2/check",
    {
      params: {
        ipAddress: ip,
        maxAgeInDays: 90,
      },
      headers: {
        Key: process.env.ABUSEIPDB_API_KEY,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

module.exports = {
  lookupAbuseIPDB,
};