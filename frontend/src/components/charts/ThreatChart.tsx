import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Props {
  high: number;
  medium: number;
  low: number;
}

function ThreatChart({
  high,
  medium,
  low,
}: Props) {
  const data = [
    {
      name: "High",
      value: high,
      color: "#EF4444",
    },
    {
      name: "Medium",
      value: medium,
      color: "#FACC15",
    },
    {
      name: "Low",
      value: low,
      color: "#22C55E",
    },
  ];

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📊 Threat Analytics Dashboard
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Bar Chart */}

        <div className="rounded-xl bg-[#0B1628] p-4">

          <h3 className="mb-4 text-lg font-semibold text-cyan-400">
            Threat Count
          </h3>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1E293B"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  ))}
                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Pie Chart */}

        <div className="rounded-xl bg-[#0B1628] p-4">

          <h3 className="mb-4 text-lg font-semibold text-cyan-400">
            Threat Distribution
          </h3>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ThreatChart;