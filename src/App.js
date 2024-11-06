import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import KpiPanel from './components/KpiPanel';
import InventoryAlerts from './components/InventoryAlerts';
import SupplierManagement from './components/SupplierManagement';
import ExpenseTracker from './components/ExpenseTracker';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
        <Header />
      <div className="app">
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kpi" element={<KpiPanel />} />
            <Route path="/inventory" element={<InventoryAlerts />} />
            <Route path="/suppliers" element={<SupplierManagement />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
