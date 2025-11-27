import { useEffect, useState } from "react";
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
};

const TransactionForm = ({
  onAddTransaction,
  onUpdateTransaction,
  editingTransaction,
}: TransactionFormProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.amount || !form.date || !form.category) {
      alert("Please fill all required fields");
      return;
    }
    // Editing transaction
    if (editingId !== null) {
      const updatedTransaction: Transaction = {
        id: editingId,
        ...form,
        amount: +form.amount,
      };

      transactionsService
        .update(editingId, updatedTransaction)
        .then((res) => {
          onUpdateTransaction(res.data);
          resetForm();
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            console.error("Backend Error:", err.response?.data);
          }
          alert("Update failed. Check console.");
        });

      return;
    }

    // Adding transaction
    const newTransactionData = {
      ...form,
      amount: +form.amount,
    };

    transactionsService
      .create(newTransactionData)
      .then((res) => {
        onAddTransaction(res.data);
        resetForm();
      })
      .catch(console.error);
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
        value={form.amount}
        name="amount"
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
