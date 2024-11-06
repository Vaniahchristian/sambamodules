import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchMockKpiData } from '../utils/mockApi';

function KpiPanel() {
  const [kpiData, setKpiData] = useState({
    dailyNetIncome: 0,
    avgOrderValue: 0,
    laborCostPct: 0,
    customerSatisfaction: 0,
    trendData: [],
  });
  const useMockData = true;

  useEffect(() => {
    const fetchKpiData = async () => {
      try {
        const data = useMockData
          ? await fetchMockKpiData()
          : (await axios.get('/api/kpi')).data;
        setKpiData(data);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
    };
    fetchKpiData();
  }, [useMockData]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Key Performance Indicators
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-md">
          <h3 className="text-base sm:text-lg font-medium text-gray-800">Daily Net Income</h3>
          <p className="text-xl sm:text-2xl text-gray-700">{kpiData.dailyNetIncome}</p>
        </div>
        <div className="bg-green-100 p-3 sm:p-4 rounded-lg shadow-md">
          <h3 className="text-base sm:text-lg font-medium text-gray-800">Avg Order Value</h3>
          <p className="text-xl sm:text-2xl text-gray-700">{kpiData.avgOrderValue}</p>
        </div>
        <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow-md">
          <h3 className="text-base sm:text-lg font-medium text-gray-800">Labor Cost %</h3>
          <p className="text-xl sm:text-2xl text-gray-700">{kpiData.laborCostPct}%</p>
        </div>
        <div className="bg-purple-100 p-3 sm:p-4 rounded-lg shadow-md">
          <h3 className="text-base sm:text-lg font-medium text-gray-800">Customer Satisfaction</h3>
          <p className="text-xl sm:text-2xl text-gray-700">{kpiData.customerSatisfaction}</p>
        </div>
      </div>

      {/* KPI Trend Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={kpiData.trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="netIncome" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default KpiPanel;
