import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Transaction } from "./types/transaction";
import transactionsService from "./services/data";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    console.log("Effect");
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
      <h1 className="text-3xl font-bold text-purple-600 text-center">
        Hello from Penie 👋
      </h1>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
        <Route path="/analytics" element={<Analytics data={transactions} />} />
      </Routes>
    </div>
  );
};

export default App;
