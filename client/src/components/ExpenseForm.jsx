import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];
const today = () => new Date().toISOString().slice(0, 10);

export default function ExpenseModal({ expense, onSave, onClose }) {
  const isEdit = !!expense?._id;
  const [form, setForm] = useState({
    amount:   expense?.amount   || "",
    category: expense?.category || "Food",
    date:     expense?.date     || today(),
    note:     expense?.note     || "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = "Valid amount required";
    if (!form.date) e.date = "Date required";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ ...form, amount: Number(form.amount) });
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  return (
    <div className="et-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="et-modal">
        <div className="et-modal-title">{isEdit ? "✏️ Edit Expense" : "➕ Add New Expense"}</div>
        <div className="et-form-row">
          <div className="et-form-group">
            <label>Amount (₹)</label>
            <input className="et-input" type="number" placeholder="e.g. 500"
              value={form.amount} onChange={e => set("amount", e.target.value)} />
            {errors.amount && <div className="et-error">{errors.amount}</div>}
          </div>
          <div className="et-form-group">
            <label>Category</label>
            <select className="et-select" value={form.category} onChange={e => set("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="et-form-group">
          <label>Date</label>
          <input className="et-input" type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          {errors.date && <div className="et-error">{errors.date}</div>}
        </div>
        <div className="et-form-group">
          <label>Note (optional)</label>
          <input className="et-input" placeholder="e.g. Pizza dinner"
            value={form.note} onChange={e => set("note", e.target.value)} />
        </div>
        <div className="et-modal-footer">
          <button className="et-btn et-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="et-btn et-btn-primary" onClick={handleSubmit}>{isEdit ? "Update" : "Add Expense"}</button>
        </div>
      </div>
    </div>
  );
}
