const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];
const CAT_COLORS = { Food: "#f97316", Transport: "#3b82f6", Bills: "#8b5cf6", Entertainment: "#ec4899", Other: "#10b981" };
const BUDGETS    = { Food: 3000, Transport: 2000, Bills: 2500, Entertainment: 1500, Other: 1000 };
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function BudgetPanel({ byCategory }) {
  return (
    <div className="et-budget-list">
      {CATEGORIES.map(cat => {
        const spent  = byCategory[cat] || 0;
        const budget = BUDGETS[cat];
        const pct    = Math.min((spent / budget) * 100, 100);
        const over   = spent > budget;
        return (
          <div key={cat} className="et-budget-row">
            <div className="et-budget-top">
              <span style={{ fontWeight: 600, fontSize: "0.83rem" }}>{cat}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.78rem", color: over ? "var(--danger)" : "var(--muted)" }}>
                {fmt(spent)} / {fmt(budget)}
              </span>
            </div>
            <div className="et-budget-bar">
              <div className="et-budget-fill" style={{ width: pct + "%", background: over ? "var(--danger)" : CAT_COLORS[cat] }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
