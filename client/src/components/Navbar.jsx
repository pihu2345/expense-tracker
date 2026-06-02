export default function Navbar({ onAdd, onExport }) {
  return (
    <nav className="et-nav">
      <div className="et-logo">Expense<span>Tracker</span></div>
      <div className="et-nav-actions">
        <button className="et-btn et-btn-export" onClick={onExport}>⬇ Export CSV</button>
        <button className="et-btn et-btn-primary" onClick={onAdd}>+ Add Expense</button>
      </div>
    </nav>
  );
}
