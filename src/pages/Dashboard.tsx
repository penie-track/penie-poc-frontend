import React from "react";
import { Transaction } from "../types/transaction";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";

interface DashboardProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
}
const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  onAddTransaction,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex flex-row gap-6">
        <div className="w-1/2">
          <AddTransaction onAdd={onAddTransaction} />
        </div>
        <div className="w-1/2">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
