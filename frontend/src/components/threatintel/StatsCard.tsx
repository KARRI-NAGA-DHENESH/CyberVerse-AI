interface Props {
  title: string;
  value: number;
  color: string;
}

function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-[#07111F] p-5 transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">

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
  );
}

export default StatsCard;