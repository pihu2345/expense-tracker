const BUDGETS = { Food: 3000, Transport: 2000, Bills: 2500, Entertainment: 1500, Other: 1000 };

export default function BudgetAlerts({ byCategory }) {
  const exceeded = Object.entries(BUDGETS).filter(([cat]) => (byCategory[cat] || 0) > BUDGETS[cat]);
  if (exceeded.length === 0) return null;
  return (
    <div className="et-alerts">
      {exceeded.map(([cat, limit]) => (
        <div key={cat} className="et-alert">
          ⚠️ <strong>{cat}</strong> budget exceeded! Spent ₹{(byCategory[cat] || 0).toLocaleString("en-IN")} of ₹{limit.toLocaleString("en-IN")} limit.
        </div>
      ))}
    </div>
  );
}
