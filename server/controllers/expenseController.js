const Expense = require("../models/Expense");

// GET /expenses?category=Food&start=2026-06-01&end=2026-06-30
exports.getExpenses = async (req, res) => {
  try {
    const { category, start, end } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (start || end) {
      filter.date = {};
      if (start) filter.date.$gte = start;
      if (end)   filter.date.$lte = end;
    }
    const data = await Expense.find(filter).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /expenses
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    if (!amount || !category || !date)
      return res.status(400).json({ error: "amount, category, date required" });
    const expense = await Expense.create({ amount: Number(amount), category, date, note: note || "" });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /expenses/:id
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /expenses/summary
exports.getSummary = async (req, res) => {
  try {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const monthStart = `${y}-${m}-01`;
    const monthEnd   = `${y}-${m}-31`;

    const monthly = await Expense.find({ date: { $gte: monthStart, $lte: monthEnd } });
    const total   = monthly.reduce((s, e) => s + e.amount, 0);
    const highest = [...monthly].sort((a, b) => b.amount - a.amount)[0] || null;
    const byCategory = {};
    monthly.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });

    res.json({ total, highest, byCategory, count: monthly.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
