import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchMockInventory } from '../utils/mockApi';

function InventoryAlerts() {
  const [inventory, setInventory] = useState([]);
  const useMockData = true; // Toggle to switch between mock and real data

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = useMockData
          ? await fetchMockInventory() // Use mock data
          : (await axios.get('/api/inventory')).data; // Use actual API if not using mock
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inventory Alerts</h2>
      <ul className="space-y-2">
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <li
              key={item.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                item.lowStock ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span className="font-semibold">{item.name}</span>
              <span>
                {item.quantity} {item.lowStock && <span className="text-sm font-semibold">(Low Stock)</span>}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No inventory data available.</p>
        )}
      </ul>
    </div>
  );
}

export default InventoryAlerts;
