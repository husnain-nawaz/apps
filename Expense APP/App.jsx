
import './App.css'


import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import Filter from "./components/Filter";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Salary", "Other"];

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, { ...expense, id: Date.now() }]);
  };

  const updateExpense = (updated) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updated.id ? updated : exp))
    );
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Derived state: filtered list based on category + search
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      filterCategory === "All" || exp.category === filterCategory;
    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Derived state: totals
  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalIncome - totalExpense;

  const currentMonth = new Date().getMonth();
  const monthlyTotal = expenses
    .filter(
      (e) =>
        e.type === "expense" && new Date(e.date).getMonth() === currentMonth
    )
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>

      <Summary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        monthlyTotal={monthlyTotal}
      />

      <ExpenseForm
        categories={CATEGORIES}
        onAdd={addExpense}
        onUpdate={updateExpense}
        editingExpense={editingExpense}
        cancelEdit={() => setEditingExpense(null)}
      />

      <Filter
        categories={CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={setEditingExpense}
      />
    </div>
  );
}


