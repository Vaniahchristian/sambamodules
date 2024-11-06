import React from 'react';
import KpiPanel from './KpiPanel';
import InventoryAlerts from './InventoryAlerts';
import SupplierManagement from './SupplierManagement';
import ExpenseTracker from './ExpenseTracker';

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Business Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <KpiPanel />
        <InventoryAlerts />
        <SupplierManagement />
        <ExpenseTracker />
      </div>
    </div>
  );
}

export default Dashboard;
