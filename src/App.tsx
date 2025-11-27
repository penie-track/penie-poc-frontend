import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import TransactionScreen from "./pages/TransactionScreen";
import { Transaction } from "./types/transaction";
import transactionsService from "./services/data";
import AI from "./pages/AI";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    transactionsService.getAll().then((res) => {
      const formatted = res.data.data.map((t: any) => ({
        ...t,
        id: t._id,
        date: new Date(t.date).toISOString().split("T")[0],
      }));
      setTransactions(formatted);
    });
  }, []);

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add"
          element={
            <Add
              transactions={transactions}
              setTransactions={setTransactions}
              editingTransaction={editingTransaction}
              setEditingTransaction={setEditingTransaction}
            />
          }
        />
        <Route path="/analytics" element={<Analytics data={transactions} />} />
        <Route
          path="/transactions"
          element={
            <TransactionScreen
              transactions={transactions}
              setTransactions={setTransactions}
              setEditingTransaction={setEditingTransaction}
            />
          }
        />
        <Route path="/ai" element={<AI />} />
      </Routes>
    </div>
  );
};

export default App;
