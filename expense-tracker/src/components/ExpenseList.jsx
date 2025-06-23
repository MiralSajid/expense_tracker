import React, { useState } from "react";

const categoryColors = {
  Food: "bg-green-200 text-green-800",
  Utilities: "bg-yellow-200 text-yellow-800",
  Transport: "bg-blue-200 text-blue-800",
  Shopping: "bg-pink-200 text-pink-800",
  Entertainment: "bg-indigo-200 text-indigo-800",
  Other: "bg-gray-200 text-gray-800",
};

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredExpenses = expenses
    .filter(exp => {
      const expenseDate = new Date(exp.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesCategory = filterCategory ? exp.category === filterCategory : true;
      const matchesStart = start ? expenseDate >= start : true;
      const matchesEnd = end ? expenseDate <= end : true;

      return matchesCategory && matchesStart && matchesEnd;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="mt-4 w-full">
      <h2 className="text-xl font-semibold text-purple-700 mb-3">Filter Expenses</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Categories</option>
          {["Food", "Utilities", "Transport", "Shopping", "Entertainment", "Other"].map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <h2 className="text-xl font-semibold text-purple-700 mb-3">All Expenses</h2>
      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses match the filter.</p>
      ) : (
        <div className="grid gap-4">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center transition-transform hover:scale-[1.03]"
            >
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{expense.title}</h3>
                <p className="text-gray-600 mb-1">Rs. {expense.amount}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-sm ${categoryColors[expense.category] || categoryColors["Other"]}`}>
                  {expense.category}
                </span>
                <p className="text-gray-500 text-sm mt-1">{expense.date}</p>
                {expense.notes && <p className="text-gray-400 text-sm italic">"{expense.notes}"</p>}
              </div>
              <div className="space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => onEdit(expense)}
                  className="bg-purple-500 text-black px-3 py-1 rounded-full hover:bg-purple-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="bg-red-500 text-black px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
