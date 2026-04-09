import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sessions: 10 },
  { month: "Feb", sessions: 15 },
  { month: "Mar", sessions: 16 },
  { month: "Apr", sessions: 14 },
  { month: "May", sessions: 13 },
  { month: "Jun", sessions: 15 },
  { month: "Jul", sessions: 16 },
  { month: "Aug", sessions: 10 },
  { month: "Sep", sessions: 10 },
  { month: "Oct", sessions: 14 },
  { month: "Nov", sessions: 14 },
  { month: "Dec", sessions: 11 },
];

export default function SessionsOverTime() {
  return (
    <div className="border border-primary rounded-xl p-5 sm:p-7">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
        Sessions Over Time
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 13 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 13 }}
            ticks={[0, 4, 8, 12, 16]}
          />
          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#FF4D4D" }}
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="#FF4D4D"
            strokeWidth={2}
            fill="url(#sessionGradient)"
            dot={{ fill: "#FF4D4D", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
