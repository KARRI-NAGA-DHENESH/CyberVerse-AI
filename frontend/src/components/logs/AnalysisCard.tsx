type Props = {
  title: string;
  value: string;
};

function AnalysisCard({ title, value }: Props) {
  return (
    <div className="rounded-xl bg-[#0B1628] p-5">
      <h3 className="font-bold text-cyan-400">
        {title}
      </h3>

      <p className="mt-3 text-gray-300">
        {value}
      </p>
    </div>
  );
}

export default AnalysisCard;