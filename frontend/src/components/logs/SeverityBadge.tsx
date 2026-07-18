type Props = {
  level: "Critical" | "High" | "Medium" | "Low";
};

function SeverityBadge({ level }: Props) {
  const colors = {
    Critical: "bg-red-600",
    High: "bg-orange-500",
    Medium: "bg-yellow-500 text-black",
    Low: "bg-green-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${colors[level]}`}
    >
      {level}
    </span>
  );
}

export default SeverityBadge;