import { Transaction } from "../types/transaction";

type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (t: Transaction) => void;
};

type ListProp = {
  transaction: Transaction;
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (t: Transaction) => void;
};

const TransactionList = ({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: TransactionListProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="font-bold text-lg mb-4">Recent Transactions</h2>

      <ul>
        {transactions.map((t) => (
          <List
            key={t.id}
            transaction={t}
            onDeleteTransaction={onDeleteTransaction}
            onEditTransaction={onEditTransaction}
          />
        ))}
      </ul>
    </div>
  );
};

const List = ({
  transaction,
  onDeleteTransaction,
  onEditTransaction,
}: ListProp) => {
  return (
    <li className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm mb-4">
      <div>
        <div className="font-medium">{transaction.description}</div>
        <div className="text-gray-500 text-sm">{transaction.category}</div>
        <div className="text-gray-400 text-xs">{transaction.date}</div>
      </div>

      <div className="flex items-center space-x-3">
        {/* EDIT BUTTON */}
        <span
          className="cursor-pointer text-blue-600"
          onClick={() => onEditTransaction(transaction)}
        >
          ✏️
        </span>

        {/* DELETE BUTTON */}
        <span
          className="cursor-pointer text-red-600"
          onClick={() => transaction.id && onDeleteTransaction(transaction.id)}
        >
          🗙
        </span>

        {/* AMOUNT */}
        <span
          className={`font-semibold ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          ${transaction.amount}
        </span>
      </div>
    </li>
  );
};

export default TransactionList;
