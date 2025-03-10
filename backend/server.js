require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db.config');

const app = express();

// Enhanced security with helmet
app.use(helmet());

// Compress responses
app.use(compression());

// Standard middleware
app.use(cors());
app.use(express.json());

// API versioning
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/client', require('./routes/client.routes'));
app.use('/api/v1/jobs', require('./routes/job.routes'));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
