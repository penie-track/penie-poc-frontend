import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { Transaction, TransactionType } from "../types/transaction";

interface AddTransactionProps {
  onAdd: (tx: Transaction) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Omit<Transaction, "id">>({
    type: "income",
    amount: 0,
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? +value : value,
    }));
  };
  const handleTypeChange = (type: TransactionType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) return;
    const newTransaction: Transaction = {
      ...formData,
      id: Date.now().toString(),
    };
    onAdd(newTransaction);
    setFormData({
      type: "income",
      amount: 0,
      category: "",
      description: "",
      date: "",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`px-4 py-2 rounded ${
            formData.type === "income"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          + Income
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`px-4 py-2 rounded ${
            formData.type === "expense"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          - Expense
        </button>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select category</option>
          <option value="food">Food</option>
          <option value="salary">Salary</option>
          <option value="transportation">Transportation</option>
          <option value="electricity">Electricity</option>
          <option value="Savings">Savings</option>
        </select>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
};

export default AddTransaction;
