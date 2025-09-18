import { Transaction } from "../types/transaction";

type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
};

type ListProp = {
  transaction: Transaction;
  onDeleteTransaction: (id: number) => void;
};

const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="font-bold text-lg mb-4">Recent Transactions</h2>

      <ul>
        {transactions.map((transaction) => (
          <List
            transaction={transaction}
            key={transaction.id}
            onDeleteTransaction={onDeleteTransaction}
          />
        ))}
      </ul>
    </div>
  );
};

const List = ({ transaction, onDeleteTransaction }: ListProp) => {
  return (
    <li className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm">
      <div>
        <div className="font-medium">{transaction.description}</div>
        <div className="text-gray-500 text-sm">{transaction.category}</div>
        <div className="text-gray-400 text-xs">{transaction.date}</div>
      </div>

      <div className="flex items-center space-x-2">
        <span
          className={`font-semibold ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.amount}
        </span>
        <span
          className="cursor-pointer"
          onClick={() => onDeleteTransaction(transaction.id)}
        >
          🗙
        </span>
      </div>
    </li>
  );
};
export default TransactionList;
