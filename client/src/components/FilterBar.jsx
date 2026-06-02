const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];

const monthRange = (offset = 0) => {
  const d = new Date();
  d.setMonth(d.getMonth() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return { start: `${y}-${m}-01`, end: `${y}-${m}-31` };
};

export default function FilterBar({ filters, onChange }) {
  const setRange = ({ start, end, label }) => onChange({ ...filters, start, end, rangeLabel: label });
  return (
    <div className="et-filters">
      <select className="et-select" value={filters.category}
        onChange={e => onChange({ ...filters, category: e.target.value })}>
        <option value="All">All Categories</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>
      <div className="et-range-btns">
        <button className={`et-range-btn ${filters.rangeLabel === "this" ? "active" : ""}`}
          onClick={() => setRange({ ...monthRange(0), label: "this" })}>This Month</button>
        <button className={`et-range-btn ${filters.rangeLabel === "last" ? "active" : ""}`}
          onClick={() => setRange({ ...monthRange(-1), label: "last" })}>Last Month</button>
        <button className={`et-range-btn ${filters.rangeLabel === "all" ? "active" : ""}`}
          onClick={() => onChange({ ...filters, start: "", end: "", rangeLabel: "all" })}>All Time</button>
      </div>
      <div className="et-date-group">
        <label>From</label>
        <input type="date" className="et-input" value={filters.start}
          onChange={e => onChange({ ...filters, start: e.target.value, rangeLabel: "custom" })} />
      </div>
      <div className="et-date-group">
        <label>To</label>
        <input type="date" className="et-input" value={filters.end}
          onChange={e => onChange({ ...filters, end: e.target.value, rangeLabel: "custom" })} />
      </div>
    </div>
  );
}
