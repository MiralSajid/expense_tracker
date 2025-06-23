import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#a78bfa", "#facc15", "#60a5fa", "#f472b6", "#6366f1", "#9ca3af"];

const Summary = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key]
  }));

  const totalSpent = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold text-purple-700 mb-4">Expense Summary</h2>
      {data.length > 0 ? (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="transition-transform duration-300 hover:scale-110"
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      ) : (
        <p className="text-gray-500">No data to display.</p>
      )}
      <p className="mt-4 text-lg font-semibold text-purple-600">
        Total Spent: Rs. {totalSpent}
      </p>
    </div>
  );
};

export default Summary;
