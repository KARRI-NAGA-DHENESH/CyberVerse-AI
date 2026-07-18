interface Props {
  country: string;
  isp: string;
  asn: string;
  latitude: number;
  longitude: number;
}

function IPLocationCard({
  country,
  isp,
  asn,
  latitude,
  longitude,
}: Props) {
  return (
    <div className="rounded-xl bg-[#0B1628] p-6">

      <h3 className="mb-5 text-xl font-bold text-cyan-400">
        🌍 IP Geolocation
      </h3>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-400">
            Country
          </span>

          <span className="font-bold text-white">
            {country}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            ISP
          </span>

          <span className="font-bold text-white">
            {isp}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            ASN
          </span>

          <span className="font-bold text-white">
            {asn}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Latitude
          </span>

          <span className="font-bold text-cyan-400">
            {latitude}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Longitude
          </span>

          <span className="font-bold text-cyan-400">
            {longitude}
          </span>
        </div>

      </div>
    </div>
  );
}

export default IPLocationCard;