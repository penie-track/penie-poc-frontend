import { useEffect, useState } from "react";
import Button from "./DesignLibrary/Button";
import Input from "./DesignLibrary/Input";
import Select from "./DesignLibrary/Select";
import { Transaction } from "../types/transaction";
import transactionsService from "../services/data";

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
};

const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [form, setForm] = useState<Omit<Transaction, "id">>({
    amount: 0,
    description: "",
    category: "",
    date: "",
    type: "income",
  });
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
      alert("Please fill all the required fields");
      return;
    }
    const newTransaction: Transaction = {
      ...form,
      id: Date.now(),
      amount: +form.amount,
    };
    transactionsService
      .create(newTransaction)
      .then((res) => {
        onAddTransaction(newTransaction);
        setForm({
          amount: 0,
          description: "",
          category: "",
          date: "",
          type: "income",
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <form className="bg-white shadow-lg rounded-xl p-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
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
        onChange={handleChange}
        name="amount"
      />
      <Select
        label="Category"
        name="category"
        value={form.category}
        options={[
          "Select Category",
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
        value={form.description}
        type="text"
        name="description"
        onChange={handleChange}
      />
      <Input
        type="date"
        value={form.date}
        name="date"
        onChange={handleChange}
        label="Date"
      />
      <Button type="submit" text="Add Transaction" />
    </form>
  );
};

export default TransactionForm;
