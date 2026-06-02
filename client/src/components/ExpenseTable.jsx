const CAT_COLORS = { Food: "#f97316", Transport: "#3b82f6", Bills: "#8b5cf6", Entertainment: "#ec4899", Other: "#10b981" };
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const fmtDate = (d) => { const [y, m, day] = d.split("-"); return `${day}-${m}-${y}`; };

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0)
    return <div className="et-empty">📭 No expenses found. Add one above!</div>;
  return (
    <div className="et-table-wrap">
      <table>
        <thead>
          <tr><th>Date</th><th>Category</th><th>Amount</th><th>Note</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e._id}>
              <td style={{ fontFamily: "var(--mono)", fontSize: "0.82rem", color: "var(--muted)" }}>{fmtDate(e.date)}</td>
              <td><span className="et-cat-badge" style={{ background: CAT_COLORS[e.category] + "22", color: CAT_COLORS[e.category] }}>{e.category}</span></td>
              <td><span className="et-amount">{fmt(e.amount)}</span></td>
              <td><span className="et-note" title={e.note}>{e.note || "—"}</span></td>
              <td>
                <div className="et-actions">
                  <button className="et-btn et-btn-sm et-btn-edit" onClick={() => onEdit(e)}>✏️</button>
                  <button className="et-btn et-btn-sm et-btn-del" onClick={() => onDelete(e._id)}>🗑</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
