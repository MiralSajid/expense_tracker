import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [editableExpense, setEditableExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    if (editableExpense) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editableExpense.id ? { ...expense, id: editableExpense.id } : item
        )
      );
      setEditableExpense(null);
    } else {
      setExpenses((prev) => [expense, ...prev]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const editExpense = (expense) => {
    setEditableExpense(expense);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Expense Tracker</h1>
      <div className="w-full max-w-screen-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <ExpenseForm onAdd={addExpense} editableExpense={editableExpense} />
        <div className="space-y-8">
          <ExpenseList expenses={expenses} onDelete={deleteExpense} onEdit={editExpense} />
          <Summary expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
