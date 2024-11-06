import React from 'react';
import { NavLink } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">Overview</NavLink>
          </li>
          <li>
            <NavLink to="/kpi" activeClassName="active">KPI Panel</NavLink>
          </li>
          <li>
            <NavLink to="/inventory" activeClassName="active">Inventory Alerts</NavLink>
          </li>
          <li>
            <NavLink to="/suppliers" activeClassName="active">Supplier Management</NavLink>
          </li>
          <li>
            <NavLink to="/expenses" activeClassName="active">Expense Tracker</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
