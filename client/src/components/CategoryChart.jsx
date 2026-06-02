import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];
const CAT_COLORS = { Food: "#f97316", Transport: "#3b82f6", Bills: "#8b5cf6", Entertainment: "#ec4899", Other: "#10b981" };

export default function CategoryChart({ byCategory }) {
  const data = CATEGORIES.map(cat => ({ name: cat, amount: byCategory[cat] || 0 })).filter(d => d.amount > 0);
  if (data.length === 0)
    return <div className="et-empty" style={{ padding: "2rem" }}>No data for chart this month</div>;
  return (
    <div className="et-chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
          <XAxis dataKey="name" tick={{ fill: "#6b6b8a", fontSize: 11, fontFamily: "Syne" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#6b6b8a", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false}
            tickFormatter={v => "₹" + (v >= 1000 ? (v/1000).toFixed(0)+"k" : v)} />
          <Tooltip contentStyle={{ background: "#1a1a26", border: "1px solid #2a2a3d", borderRadius: 8, fontFamily: "Syne" }}
            formatter={v => ["₹" + v.toLocaleString("en-IN"), "Spent"]} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map(d => <Cell key={d.name} fill={CAT_COLORS[d.name]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
