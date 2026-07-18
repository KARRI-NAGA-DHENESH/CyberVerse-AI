const axios = require("axios");

async function lookupVirusTotal(ip) {
  const response = await axios.get(
    `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
    {
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
      },
    }
  );

  return response.data;
}

module.exports = {
  lookupVirusTotal,
};