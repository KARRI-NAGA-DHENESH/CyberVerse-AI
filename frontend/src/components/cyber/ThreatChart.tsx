import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "09:00", attacks: 8 },
  { time: "10:00", attacks: 14 },
  { time: "11:00", attacks: 9 },
  { time: "12:00", attacks: 21 },
  { time: "13:00", attacks: 17 },
  { time: "14:00", attacks: 28 },
  { time: "15:00", attacks: 22 },
];

function ThreatChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="cyber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="#123" strokeDasharray="4 4" />

        <XAxis dataKey="time" stroke="#94a3b8" />

        <YAxis stroke="#94a3b8" />

        <Area
          type="monotone"
          dataKey="attacks"
          stroke="#00E5FF"
          strokeWidth={3}
          fill="url(#cyber)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ThreatChart;