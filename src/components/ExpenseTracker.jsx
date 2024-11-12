import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0); // Track total of all added expenses
  const [totalPayments, setTotalPayments] = useState(0); // Track total payments from database
  const [balance, setBalance] = useState(0); // Track the balance

  // Fetch expenses and total payments when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total payments from the backend
        const paymentsResponse = await axios.get('http://localhost:5000/api/total-payments');
        const total = parseFloat(paymentsResponse.data.totalPayments) || 0;
        setTotalPayments(total);

        // Fetch expenses from the backend
        const expensesResponse = await axios.get('http://localhost:5000/api/expenses');
        const expensesData = expensesResponse.data;
        setExpenses(expensesData);

        // Calculate total expenses from fetched data
        const totalExpenses = expensesData.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
        setTotalExpenses(totalExpenses);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch expenses and total payments when component loads
    fetchData();
  }, []);

  // Update balance whenever totalPayments or totalExpenses changes
  useEffect(() => {
    setBalance(totalPayments - totalExpenses);
  }, [totalPayments, totalExpenses]);

  // Function to handle adding a new expense
  const handleAddExpense = async (newExpense) => {
    const amount = parseFloat(newExpense.amount) || 0; // Ensure the amount is a number

    try {
      // Send the new expense to the backend
      await axios.post('http://localhost:5000/api/expenses', {
        amount,
        category: newExpense.category,
      });

      // Update local state after successfully adding the expense
      setExpenses([...expenses, { ...newExpense, amount }]);
      setTotalExpenses(totalExpenses + amount); // Increment total expenses
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Expense Tracker
      </h2>

      <div className="mb-6">
        <p className="text-lg text-gray-700">Total Payments: UGX {Number(totalPayments).toFixed(2)}</p>
        <p className="text-lg text-gray-700">Total Expenses: UGX {Number(totalExpenses).toFixed(2)}</p>
        <p className="text-lg font-semibold text-gray-800">Balance: UGX {Number(balance).toFixed(2)}</p>
      </div>

      {/* Expense Form and Expense List */}
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <ExpenseForm onExpenseAdded={handleAddExpense} />
        </div>

        <div className="lg:w-1/2">
          <ul className="space-y-4">
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-700">{expense.category}</span>
                  <span className="text-gray-600">
                    UGX {parseFloat(expense.amount).toFixed(2)}
                  </span>
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
