const express = require('express');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Exponentiation endpoint
app.post('/exponentiate', (req, res) => {
    const { base, exponent } = req.body;
    if (isNaN(base) || isNaN(exponent)) {
        logger.error('Invalid parameters for exponentiation:', { base, exponent });
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    logger.info('Exponentiation operation performed:', { base, exponent, result });
    res.json({ result });
});

// Square root endpoint
app.post('/sqrt', (req, res) => {
    const { number } = req.body;
    if (isNaN(number)) {
        logger.error('Invalid parameter for square root:', { number });
        return res.status(400).json({ error: 'Parameter must be a valid number' });
    }
    if (parseFloat(number) < 0) {
        logger.error('Cannot calculate square root of a negative number:', { number });
        return res.status(400).json({ error: 'Cannot calculate square root of a negative number' });
    }
    const result = Math.sqrt(parseFloat(number));
    logger.info('Square root operation performed:', { number, result });
    res.json({ result });
});

// Modulo operation endpoint
app.post('/modulo', (req, res) => {
    const { dividend, divisor } = req.body;
    if (isNaN(dividend) || isNaN(divisor)) {
        logger.error('Invalid parameters for modulo operation:', { dividend, divisor });
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }
    if (parseFloat(divisor) === 0) {
        logger.error('Division by zero error in modulo operation:', { dividend, divisor });
        return res.status(400).json({ error: 'Cannot perform modulo operation with divisor equal to zero' });
    }
    const result = parseFloat(dividend) % parseFloat(divisor);
    logger.info('Modulo operation performed:', { dividend, divisor, result });
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
