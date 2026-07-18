const axios = require("axios");

async function lookupOTX(ip) {
  const response = await axios.get(
    `https://otx.alienvault.com/api/v1/indicators/IPv4/${ip}/general`,
    {
      headers: {
        "X-OTX-API-KEY": process.env.OTX_API_KEY,
      },
    }
  );

  return response.data;
}

module.exports = {
  lookupOTX,
};