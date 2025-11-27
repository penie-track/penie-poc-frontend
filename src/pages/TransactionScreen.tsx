import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import { Transaction } from "../types/transaction";
import transactionService from "../services/data";

type TransactionScreenProps = {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  setEditingTransaction: Dispatch<SetStateAction<Transaction | null>>;
};

const TransactionScreen = ({
  transactions,
  setTransactions,
  setEditingTransaction,
}: TransactionScreenProps) => {
  const navigate = useNavigate();

  const handleDeleteTransaction = async (id: string) => {
    try {
      await transactionService.remove(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction); // set the transaction to edit
    navigate("/add"); // redirect to Add page
  };

  return (
    <TransactionList
      transactions={transactions}
      onDeleteTransaction={handleDeleteTransaction}
      onEditTransaction={handleEditTransaction}
    />
  );
};

export default TransactionScreen;
