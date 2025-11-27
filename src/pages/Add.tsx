import React, { Dispatch, SetStateAction } from "react";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types/transaction";

type AddProps = {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  editingTransaction: Transaction | null;
  setEditingTransaction: Dispatch<SetStateAction<Transaction | null>>;
};

const Add = ({
  transactions,
  setTransactions,
  editingTransaction,
  setEditingTransaction,
}: AddProps) => {
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleUpdateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setEditingTransaction(null); // exit edit mode
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <TransactionForm
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

export default Add;
