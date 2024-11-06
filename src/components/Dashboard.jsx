import React from 'react';
import KpiPanel from './KpiPanel';
import InventoryAlerts from './InventoryAlerts';
import SupplierManagement from './SupplierManagement';
import ExpenseTracker from './ExpenseTracker';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Business Dashboard</h1>
      <div className="dashboard-sections">
        <KpiPanel />
        <InventoryAlerts />
        <SupplierManagement />
        <ExpenseTracker />
      </div>
    </div>
  );
}

export default Dashboard;
