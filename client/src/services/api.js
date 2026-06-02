const BASE_URL = "http://localhost:5000";

export async function getExpenses({ category = "All", start = "", end = "" } = {}) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.append("category", category);
  if (start) params.append("start", start);
  if (end)   params.append("end", end);
  const res = await fetch(`${BASE_URL}/expenses?${params}`);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function addExpense(expense) {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to add expense");
  return res.json();
}

export async function updateExpense(id, updates) {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update expense");
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete expense");
  return res.json();
}

export async function getSummary() {
  const res = await fetch(`${BASE_URL}/expenses/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}
