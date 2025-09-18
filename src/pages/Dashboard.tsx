import React from "react";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";
import { Transaction } from "../types/transaction";
import TransactionList from "../components/TransactionList";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};

export default Dashboard;
