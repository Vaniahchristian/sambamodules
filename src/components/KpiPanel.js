import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchMockKpiData } from '../utils/mockApi';

function KpiPanel() {
  const [kpiData, setKpiData] = useState({
    dailyNetIncome: 0,
    avgOrderValue: 0,
    laborCostPct: 0,
    customerSatisfaction: 0,
    trendData: [],
  });
  const useMockData = true; // Toggle this to switch between real and mock data

  useEffect(() => {
    const fetchKpiData = async () => {
      try {
        const data = useMockData
          ? await fetchMockKpiData() // Use mock data
          : (await axios.get('/api/kpi')).data; // Use actual API data if not mocking
        setKpiData(data);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
    };
    fetchKpiData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Key Performance Indicators</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Daily Net Income</h3>
          <p className="text-2xl text-gray-700">{kpiData.dailyNetIncome}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Avg Order Value</h3>
          <p className="text-2xl text-gray-700">{kpiData.avgOrderValue}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Labor Cost %</h3>
          <p className="text-2xl text-gray-700">{kpiData.laborCostPct}%</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Customer Satisfaction</h3>
          <p className="text-2xl text-gray-700">{kpiData.customerSatisfaction}</p>
        </div>
      </div>

      {/* KPI Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <LineChart width={600} height={300} data={kpiData.trendData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="netIncome" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

export default KpiPanel;
