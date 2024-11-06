import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchMockSuppliers } from '../utils/mockApi';

function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const useMockData = true; // Toggle this to switch between real and mock data

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = useMockData
          ? await fetchMockSuppliers() // Use mock data
          : (await axios.get('/api/suppliers')).data; // Use actual API data if not mocking
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Supplier Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-800">{supplier.name}</h3>
              <p className="text-gray-600">Total Orders: {supplier.purchaseOrders.length}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {supplier.purchaseOrders.slice(0, 3).map((order, index) => (
                  <li key={index}>Order #{order.id} - {order.date}</li>
                ))}
                {supplier.purchaseOrders.length > 3 && (
                  <li className="text-blue-500">+ {supplier.purchaseOrders.length - 3} more orders</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suppliers found.</p>
        )}
      </div>
    </div>
  );
}

export default SupplierManagement;
