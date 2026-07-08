export default function ExpenseItem({ expense, onDelete, onEdit }) {
  const isIncome = expense.type === "income";

  return (
    <li className="bg-white shadow rounded-lg p-3 flex justify-between items-center">
      <div>
        <p className="font-medium">{expense.title}</p>
        <p className="text-sm text-gray-500">
          {expense.category} • {expense.date}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={isIncome ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
        >
          {isIncome ? "+" : "-"}Rs {Number(expense.amount).toLocaleString()}
        </span>
        <button
          onClick={() => onEdit(expense)}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
