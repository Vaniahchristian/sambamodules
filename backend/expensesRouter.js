// Import necessary modules
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'samba'
});

// Route to get all expenses
router.get('/api/expenses', (req, res) => {
  db.query('SELECT * FROM expenses ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Route to add a new expense
router.post('/api/expenses', (req, res) => {
  const { amount, category } = req.body;

  if (!amount || !category) {
    return res.status(400).json({ message: 'Amount and category are required' });
  }

  // Insert the new expense into the database
  db.query(
    'INSERT INTO expenses (amount, category) VALUES (?, ?)',
    [amount, category],
    (err, results) => {
      if (err) {
        console.error('Error adding expense:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ id: results.insertId, amount, category });
    }
  );
});

// Route to get total payments
router.get('/api/total-payments', (req, res) => {
  const query = 'SELECT SUM(Amount) AS totalPayments FROM payments'; // Adjust column name if needed

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total payments:', err);
      return res.status(500).send('Database query error');
    }
    const totalPayments = results[0].totalPayments || 0;
    res.json({ totalPayments });
  });
});

module.exports = router;
