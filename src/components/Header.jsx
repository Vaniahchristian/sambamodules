import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-900 text-white p-4 shadow-md">
      <div className="text-2xl font-bold text-gray-200">
        Business Dashboard
      </div>
      <nav className="space-x-4">
        <NavLink
          exact
          to="/"
          activeclassname="text-blue-400"
          className="text-gray-300 hover:text-white transition"
        >
          Overview
        </NavLink>
        <NavLink
          to="/kpi"
          activeclassname="text-blue-400"
          className="text-gray-300 hover:text-white transition"
        >
          KPI Panel
        </NavLink>
        <NavLink
          to="/inventory"
          activeclassname="text-blue-400"
          className="text-gray-300 hover:text-white transition"
        >
          Inventory Alerts
        </NavLink>
        <NavLink
          to="/suppliers"
          activeclassname="text-blue-400"
          className="text-gray-300 hover:text-white transition"
        >
          Supplier Management
        </NavLink>
        <NavLink
          to="/expenses"
          activeclassname="text-blue-400"
          className="text-gray-300 hover:text-white transition"
        >
          Expense Tracker
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
