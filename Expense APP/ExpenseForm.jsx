import { useState, useEffect } from "react";

export default function ExpenseForm({
  categories,
  onAdd,
  onUpdate,
  editingExpense,
  cancelEdit,
}) {
  const emptyForm = {
    title: "",
    amount: "",
    type: "expense",
    category: categories[0],
    date: new Date().toISOString().slice(0, 10),
  };

  const [form, setForm] = useState(emptyForm);

  // Jab editingExpense set ho, form ko us data se fill karo
  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense);
    } else {
      setForm(emptyForm);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.amount) return;

    if (editingExpense) {
      onUpdate(form);
    } else {
      onAdd(form);
    }
    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 space-y-3"
    >
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-3 py-2 col-span-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingExpense ? "Update" : "Add"} Expense
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}