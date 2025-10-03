import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-purple-600 text-center">
        Hello from Penie 👋
      </h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default App;
