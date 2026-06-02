import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCard";
import BudgetAlerts from "./components/BudgetAlerts";
import FilterBar from "./components/FilterBar";
import ExpenseTable from "./components/ExpenseTable";
import CategoryChart from "./components/CategoryChart";
import BudgetPanel from "./components/BudgetPanel";
import ExpenseModal from "./components/ExpenseForm";
import * as api from "./services/api";
import "./App.css";

const monthRange = (offset = 0) => {
  const d = new Date();
  d.setMonth(d.getMonth() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return { start: `${y}-${m}-01`, end: `${y}-${m}-31` };
};

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary]   = useState({ total: 0, highest: null, byCategory: {} });
  const [filters, setFilters]   = useState({
    category: "All",
    start: monthRange(0).start,
    end:   monthRange(0).end,
    rangeLabel: "this",
  });
  const [modal, setModal] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const { category, start, end } = filters;
      const [exps, sum] = await Promise.all([
        api.getExpenses({ category, start, end }),
        api.getSummary(),
      ]);
      setExpenses(exps);
      setSummary(sum);
    } catch (err) {
      console.error("Load error:", err);
    }
  }, [filters]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async (form) => {
    try {
      if (modal?.expense?._id) {
        await api.updateExpense(modal.expense._id, form);
      } else {
        await api.addExpense(form);
      }
      setModal(null);
      loadData();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      await api.deleteExpense(id);
      loadData();
    }
  };

  const handleExport = async () => {
    const { category, start, end } = filters;
    const all = await api.getExpenses({ category, start, end });
    const rows = [
      ["Date", "Category", "Amount", "Note"],
      ...all.map(e => [e.date, e.category, e.amount, e.note || ""]),
    ];
    const csv  = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = "expenses.csv";
    a.click();
  };

  return (
    <div className="et-root">
      <Navbar onAdd={() => setModal({ mode: "add" })} onExport={handleExport} />
      <main className="et-main">
        <SummaryCards summary={summary} />
        <BudgetAlerts byCategory={summary.byCategory} />
        <FilterBar filters={filters} onChange={setFilters} />
        <div className="et-grid-2">
          <div className="et-card" style={{ padding: "1.5rem" }}>
            <div className="et-section-title">📋 Expenses ({expenses.length})</div>
            <ExpenseTable
              expenses={expenses}
              onEdit={e => setModal({ mode: "edit", expense: e })}
              onDelete={handleDelete}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="et-card">
              <div className="et-section-title">📊 Spending by Category</div>
              <CategoryChart byCategory={summary.byCategory} />
            </div>
            <div className="et-card">
              <div className="et-section-title">🎯 Monthly Budgets</div>
              <BudgetPanel byCategory={summary.byCategory} />
            </div>
          </div>
        </div>
      </main>
      {modal && (
        <ExpenseModal
          expense={modal.mode === "edit" ? modal.expense : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
