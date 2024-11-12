const express = require('express');
const app = express();
const expensesRouter = require('./expensesRouter'); // Adjust if your router file is named differently
const cors = require('cors');

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the expenses router for API routes
app.use(expensesRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
