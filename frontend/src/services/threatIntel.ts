const VIRUSTOTAL_API_KEY =
  import.meta.env.VITE_VIRUSTOTAL_API_KEY;

const ABUSEIPDB_API_KEY =
  import.meta.env.VITE_ABUSEIPDB_API_KEY;

const OTX_API_KEY =
  import.meta.env.VITE_OTX_API_KEY;

/* ---------------- VirusTotal ---------------- */

export async function lookupVirusTotalIP(ip: string) {
  const response = await fetch(
    `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
    {
      headers: {
        "x-apikey": VIRUSTOTAL_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("VirusTotal lookup failed");
  }

  return await response.json();
}

/* ---------------- AbuseIPDB ---------------- */

export async function lookupAbuseIPDB(ip: string) {
  const response = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(
      ip
    )}&maxAgeInDays=90`,
    {
      headers: {
        Key: ABUSEIPDB_API_KEY,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("AbuseIPDB lookup failed");
  }

  return await response.json();
}

/* ---------------- AlienVault OTX ---------------- */

export async function lookupOTX(ip: string) {
  const response = await fetch(
    `https://otx.alienvault.com/api/v1/indicators/IPv4/${ip}/general`,
    {
      headers: {
        "X-OTX-API-KEY": OTX_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("AlienVault OTX lookup failed");
  }

  return await response.json();
}

/* ---------------- Export API Keys ---------------- */

export {
  VIRUSTOTAL_API_KEY,
  ABUSEIPDB_API_KEY,
  OTX_API_KEY,
};