import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import { fetchMockExpenses } from '../utils/mockApi';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const useMockData = true; // Toggle this to switch between real and mock data

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = useMockData
          ? await fetchMockExpenses() // Use mock data
          : (await axios.get('/api/expenses')).data; // Use actual API data if not mocking
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, [useMockData]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Expense Tracker
      </h2>

      {/* Responsive Flex container for left and right layout */}
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        {/* Left side: Expense Form */}
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <ExpenseForm
            onExpenseAdded={(newExpense) => setExpenses([...expenses, newExpense])}
          />
        </div>

        {/* Right side: Expense List */}
        <div className="lg:w-1/2">
          <ul className="space-y-4">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-700">{expense.category}</span>
                  <span className="text-gray-600">${expense.amount}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No expenses recorded yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
