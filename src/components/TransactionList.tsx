import React from "react";
import { Transaction } from "../types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) return <p>No transactions yet</p>;
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Recent Transactions</h2>
      <ul className="divide-y">
        {transactions.map((transactions) => (
          <li key={transactions.id} className="py-2 flex justify-between">
            <div>
              <div className="font-medium">{transactions.category}</div>
              <div className="text-sm text-gray-500">
                {transactions.description}
              </div>
            </div>
            <div
              className={`font-bold ${
                transactions.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${transactions.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
