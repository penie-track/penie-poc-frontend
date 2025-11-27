import React, { Dispatch, SetStateAction, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { Transaction } from "../types/transaction";
import transactionService from "../services/data";

type AddTransactionProps = {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
};

const AddTransaction = ({
  transactions,
  setTransactions,
}: AddTransactionProps) => {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleUpdateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setEditingTransaction(null); // exit edit mode
  };

  const handleDeleteTransaction = async (id: string) => {
    await transactionService.remove(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <TransactionForm
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        editingTransaction={editingTransaction}
      />

      <TransactionList
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
        onEditTransaction={setEditingTransaction}
      />
    </div>
  );
};

export default AddTransaction;
