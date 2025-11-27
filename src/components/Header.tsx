import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-purple-600">Penie</h1>
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className="text-gray-700 hover:text-purple-600">
              Home
            </NavLink>
            <NavLink to="/add" className="text-gray-700 hover:text-purple-600">
              Add
            </NavLink>
            <NavLink
              to="/transactions"
              className="text-gray-700 hover:text-purple-600"
            >
              Transactions
            </NavLink>
            <NavLink
              to="/analytics"
              className="text-gray-700 hover:text-purple-600"
            >
              Analytics
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
