import React, { useState, useEffect } from "react";

const ExpenseForm = ({ onAdd, editableExpense }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  const categories = ["Food", "Utilities", "Transport", "Shopping", "Entertainment", "Other"];

  useEffect(() => {
    if (editableExpense) {
      setFormData(editableExpense);
    }
  }, [editableExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      alert("Fill all required fields!");
      return;
    }if (formData.amount <= 0) {
      alert("Amount must be positive.");
      return;
    
    }
    onAdd({ ...formData, id: editableExpense ? editableExpense.id : Date.now() });
    setFormData({ title: "", amount: "", category: "", date: "", notes: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gradient-to-r from-purple-200 to-blue-100 p-6 rounded-2xl shadow-lg w-full"
    >
      <h2 className="text-xl font-semibold text-purple-700 mb-2">
        {editableExpense ? "Edit Expense" : "Add New Expense"}
      </h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-purple-400"
        required
      />

      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-purple-400"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-purple-400"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-purple-400"
        required
      />

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400"
      />

      <button
        type="submit"
        className="w-full bg-purple-500 text-black px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
      >
        {editableExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
