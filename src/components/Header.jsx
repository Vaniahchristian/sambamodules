import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-gray-200">
          Business Dashboard
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-4`}
        >
          <NavLink
            exact
            to="/"
            activeclassname="text-blue-400"
            className="block px-2 py-1 text-gray-300 hover:text-white transition"
          >
            Overview
          </NavLink>
          <NavLink
            to="/kpi"
            activeclassname="text-blue-400"
            className="block px-2 py-1 text-gray-300 hover:text-white transition"
          >
            KPI Panel
          </NavLink>
          <NavLink
            to="/inventory"
            activeclassname="text-blue-400"
            className="block px-2 py-1 text-gray-300 hover:text-white transition"
          >
            Inventory Alerts
          </NavLink>
          <NavLink
            to="/suppliers"
            activeclassname="text-blue-400"
            className="block px-2 py-1 text-gray-300 hover:text-white transition"
          >
            Supplier Management
          </NavLink>
          <NavLink
            to="/expenses"
            activeclassname="text-blue-400"
            className="block px-2 py-1 text-gray-300 hover:text-white transition"
          >
            Expense Tracker
          </NavLink>
        </nav>
      </div>

      {/* Mobile Menu (Only visible on small screens) */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-gray-800">
          <NavLink
            exact
            to="/"
            activeclassname="text-blue-400"
            className="block px-4 py-2 text-gray-300 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Overview
          </NavLink>
          <NavLink
            to="/kpi"
            activeclassname="text-blue-400"
            className="block px-4 py-2 text-gray-300 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            KPI Panel
          </NavLink>
          <NavLink
            to="/inventory"
            activeclassname="text-blue-400"
            className="block px-4 py-2 text-gray-300 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Inventory Alerts
          </NavLink>
          <NavLink
            to="/suppliers"
            activeclassname="text-blue-400"
            className="block px-4 py-2 text-gray-300 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Supplier Management
          </NavLink>
          <NavLink
            to="/expenses"
            activeclassname="text-blue-400"
            className="block px-4 py-2 text-gray-300 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Expense Tracker
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
