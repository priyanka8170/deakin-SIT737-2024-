const express = require('express');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a logger object
const logger = winston.createLogger({
    level: 'info', // Log level set to 'info'
    format: winston.format.json(), // Log format set to JSON
    defaultMeta: { service: 'calculator-microservice' }, // Default metadata
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(), // Log format for console
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to error.log file
        new winston.transports.File({ filename: 'logs/combined.log' }) // Log all messages to combined.log file
    ]
});

// Middleware to parse JSON request body
app.use(express.json());

// Addition endpoint
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid parameters for addition:', { num1, num2 }); // Log error if parameters are not valid numbers
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info('Addition operation performed:', { num1, num2, result }); // Log addition operation
    res.json({ result });
});

// Subtraction endpoint
app.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid parameters for subtraction:', { num1, num2 }); // Log error if parameters are not valid numbers
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }
    const result = parseFloat(num1) - parseFloat(num2);
    logger.info('Subtraction operation performed:', { num1, num2, result }); // Log subtraction operation
    res.json({ result });
});

// Multiplication endpoint
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid parameters for multiplication:', { num1, num2 }); // Log error if parameters are not valid numbers
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }
    const result = parseFloat(num1) * parseFloat(num2);
    logger.info('Multiplication operation performed:', { num1, num2, result }); // Log multiplication operation
    res.json({ result });
});

// Division endpoint
app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid parameters for division:', { num1, num2 }); // Log error if parameters are not valid numbers
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }
    if (parseFloat(num2) === 0) {
        logger.error('Division by zero error:', { num1, num2 }); // Log error if attempting to divide by zero
        return res.status(400).json({ error: 'Cannot divide by zero' });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    logger.info('Division operation performed:', { num1, num2, result }); // Log division operation
    res.json({ result });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Internal server error:', { error: err.message }); // Log internal server errors
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3040}`);
});
