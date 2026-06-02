const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function SummaryCards({ summary }) {
  const { total, highest, byCategory } = summary;
  const topCat = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  return (
    <div className="et-grid">
      <div className="et-card">
        <div className="et-card-icon">💰</div>
        <div className="et-card-label">Total This Month</div>
        <div className="et-card-value indigo">{fmt(total)}</div>
        <div className="et-card-sub">All categories combined</div>
      </div>
      <div className="et-card">
        <div className="et-card-icon">🔺</div>
        <div className="et-card-label">Highest Expense</div>
        <div className="et-card-value amber">{highest ? fmt(highest.amount) : "—"}</div>
        <div className="et-card-sub">{highest ? `${highest.category} · ${highest.note}` : "No data"}</div>
      </div>
      <div className="et-card">
        <div className="et-card-icon">🏷</div>
        <div className="et-card-label">Top Category</div>
        <div className="et-card-value green">{topCat ? topCat[0] : "—"}</div>
        <div className="et-card-sub">{topCat ? fmt(topCat[1]) : "No data"}</div>
      </div>
    </div>
  );
}
