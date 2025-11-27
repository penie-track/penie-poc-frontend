import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./DesignLibrary/Button";
import Input from "./DesignLibrary/Input";
import Select from "./DesignLibrary/Select";
import { Transaction } from "../types/transaction";
import transactionsService from "../services/data";
import axios from "axios";

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
  setEditingTransaction?: (t: Transaction | null) => void;
};

const TransactionForm = ({
  onAddTransaction,
  onUpdateTransaction,
  editingTransaction,
  setEditingTransaction,
}: TransactionFormProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Transaction, "id">>({
    amount: 0,
    description: "",
    category: "",
    date: "",
    type: "income",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  // Prefill form when editing
  useEffect(() => {
    if (editingTransaction) {
      const { id, ...rest } = editingTransaction;
      setForm(rest);
      setEditingId(id ?? null);
    }
  }, [editingTransaction]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      amount: 0,
      description: "",
      category: "",
      date: "",
      type: "income",
    });
    setEditingId(null);
    setEditingTransaction && setEditingTransaction(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.amount || !form.date || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    // UPDATE MODE
    if (editingId) {
      const updatedTransaction: Transaction = {
        id: editingId,
        ...form,
        amount: +form.amount,
      };

      try {
        await transactionsService.update(editingId, updatedTransaction);
        onUpdateTransaction(updatedTransaction);
        resetForm();
        navigate("/transactions");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Backend response:", err.response?.data);
          console.error("Status:", err.response?.status);
        } else {
          console.error("Unexpected error:", err);
        }
        alert("Update failed! Check console.");
      }

      return;
    }

    // ADD MODE
    try {
      const response = await transactionsService.create(form); // no id sent
      onAddTransaction(response.data); // backend returns new transaction with id
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Add failed! Check console.");
    }
  };

  return (
    <form className="bg-white shadow-lg rounded-xl p-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <div className="flex gap-2">
        <Button
          text="+ Income"
          variant="income"
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, type: "income" }))}
        />
        <Button
          text="- Expense"
          type="button"
          variant="expense"
          onClick={() => setForm((prev) => ({ ...prev, type: "expense" }))}
        />
      </div>

      <Input
        label="Amount"
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
      />

      <Select
        label="Category"
        name="category"
        value={form.category}
        options={[
          "Groceries",
          "Transportation",
          "Utilities",
          "Entertainment",
          "Healthcare",
          "Education",
          "Shopping",
          "Restaurant",
          "EMI",
          "Insurance",
          "Repairs",
          "Other Expense",
        ]}
        onChange={handleChange}
      />

      <Input
        label="Description"
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <Input
        label="Date"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <Button
        type="submit"
        text={editingId ? "Update Transaction" : "Add Transaction"}
      />
    </form>
  );
};

export default TransactionForm;
