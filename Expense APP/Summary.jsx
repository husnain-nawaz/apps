


export default function Summary({
  totalIncome,
  totalExpense,
  balance,
  monthlyTotal,
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-green-100 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-600">Income</p>
        <p className="text-lg font-bold text-green-700">
          Rs {totalIncome.toLocaleString()}
        </p>
      </div>
      <div className="bg-red-100 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-600">Expense</p>
        <p className="text-lg font-bold text-red-700">
          Rs {totalExpense.toLocaleString()}
        </p>
      </div>
      <div className="bg-blue-100 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-600">Balance</p>
        <p className="text-lg font-bold text-blue-700">
          Rs {balance.toLocaleString()}
        </p>
      </div>
      <div className="bg-yellow-100 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-600">This Month</p>
        <p className="text-lg font-bold text-yellow-700">
          Rs {monthlyTotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
