const { createLogger, transports, format } = require('winston');

// Define log levels (optional but recommended)
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Create the logger
const logger = createLogger({
  level: 'info', // Minimum logging level (change as needed)
  levels: logLevels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'your-service-name' }, // Optional: Add metadata
  transports: [
    // Define where logs should be written
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'combined.log' }), // Log all levels to another file
  ],
});

module.exports = logger;