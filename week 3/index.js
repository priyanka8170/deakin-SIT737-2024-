const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Addition endpoint
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers' });
  }
  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

// Subtraction endpoint
app.post('/subtract', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers' });
  }
  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
});

// Multiplication endpoint
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers' });
  }
  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

// Division endpoint
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers' });
  }
  if (parseFloat(num2) === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

// Start the server
app.listen(3040, () => {
  console.log(`Server is running on http://localhost:${3040}`);
});
