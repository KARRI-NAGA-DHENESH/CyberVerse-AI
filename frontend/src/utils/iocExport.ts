export function buildIOCList(data: {
  ips: string[];
  domains: string[];
  urls: string[];
  emails: string[];
  md5s: string[];
  sha1s: string[];
  sha256s: string[];
}) {
  return [
    ...data.ips.map(i => `IP,${i}`),
    ...data.domains.map(i => `DOMAIN,${i}`),
    ...data.urls.map(i => `URL,${i}`),
    ...data.emails.map(i => `EMAIL,${i}`),
    ...data.md5s.map(i => `MD5,${i}`),
    ...data.sha1s.map(i => `SHA1,${i}`),
    ...data.sha256s.map(i => `SHA256,${i}`)
  ];
}