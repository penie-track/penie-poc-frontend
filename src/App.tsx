import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Transaction } from "./types/transaction";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const handleAddTransaction = (tx: Transaction) => {
    setTransactions([tx, ...transactions]);
  };
  return (
    <div>
      <nav className="bg-gray-800 p-8 text-white flex gap-10">
        <Link className="hover:underline" to="/">
          DashBoard
        </Link>
        <Link className="hover:underline" to="/Analytics">
          Analytics
        </Link>
      </nav>
      <h1 className="text-3xl font-bold text-purple-600 text-center">
        Hello from Penie 👋
      </h1>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          }
        ></Route>
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default App;
