interface Props {
  title: string;
  value: string | number;
  color: string;
  icon: string;
}

function KPICard({
  title,
  value,
  color,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6 transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2
            className="mt-3 text-4xl font-bold"
            style={{ color }}
          >
            {value}
          </h2>

        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default KPICard;