// src/utils/mockApi.js

export const fetchMockExpenses = async () => {
    // Simulate API response with mock data
    return [
      { id: 1, category: 'Food', amount: '$50' },
      { id: 2, category: 'Transport', amount: '$20' },
      { id: 3, category: 'Entertainment', amount: '$30' },
      // Add more mock data as needed
    ];
  };


  export const fetchMockInventory = async () => {
    // Mock inventory data
    return [
      { id: 1, name: 'Product A', quantity: 5, lowStock: true },
      { id: 2, name: 'Product B', quantity: 20, lowStock: false },
      { id: 3, name: 'Product C', quantity: 2, lowStock: true },
      // Add more data as needed
    ];
  };  


  export const fetchMockKpiData = async () => {
    return {
      dailyNetIncome: 5000,
      avgOrderValue: 75,
      laborCostPct: 20,
      customerSatisfaction: 90,
      trendData: [
        { date: '2024-11-01', netIncome: 4800 },
        { date: '2024-11-02', netIncome: 5000 },
        { date: '2024-11-03', netIncome: 5200 },
        { date: '2024-11-04', netIncome: 5300 },
        { date: '2024-11-05', netIncome: 5100 },
        // Add more trend points as needed
      ],
    };
  };
  
  


export const fetchMockSuppliers = async () => {
    return [
      { id: 1, name: 'Supplier A', purchaseOrders: [{ id: 'PO1' }, { id: 'PO2' }] },
      { id: 2, name: 'Supplier B', purchaseOrders: [{ id: 'PO3' }] },
      { id: 3, name: 'Supplier C', purchaseOrders: [{ id: 'PO4' }, { id: 'PO5' }, { id: 'PO6' }] },
      // Add more suppliers as needed
    ];
  };
   