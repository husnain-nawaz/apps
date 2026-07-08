import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return <p className="text-center text-gray-500">No expenses found.</p>;
  }

  return (
    <ul className="space-y-2">
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp.id}
          expense={exp}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
