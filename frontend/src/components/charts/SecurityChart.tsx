import {
  BarChart,
  Bar,
 XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartItem = {
  name: string;
  attacks: number;
};

type Props = {
  data: ChartItem[];
};

function SecurityChart({ data }: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📊 Security Analytics
      </h2>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="attacks"
              fill="#00E5FF"
            />

          </BarChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default SecurityChart;