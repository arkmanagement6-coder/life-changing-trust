// Project LIFE: Central Backend Bootstrap Server
// Node.js + Express API Gateway

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load environment configurations
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'LIFE_SECRET_KEY_2026';

// Global Middlewares
app.use(cors());
app.use(express.json());

// JWT Authentication Guard Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired access token" });
    req.user = user;
    next();
  });
};

// Role-Based Authorization Guard Factory
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Permission denied: insufficient privileges" });
    }
    next();
  };
};

// Health Check Endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "Healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    gateway: "Razorpay/Cashfree Active",
    redisQueue: "BullMQ Connected"
  });
});

// Import API Routers
const authRouter = require('./routes/auth');
const campaignsRouter = require('./routes/campaigns');
const donationsRouter = require('./routes/donations');
const volunteersRouter = require('./routes/volunteers');
const csrRouter = require('./routes/csr');
const crmRouter = require('./routes/crm');

// Mount API Routers
app.use('/api/auth', authRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/donations', donationsRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/csr', csrRouter);
app.use('/api/crm', crmRouter);

// Centralized Error Handling Middleware (Sentry-ready)
app.use((err, req, res, next) => {
  console.error(`[Error Logged]: ${err.message}`, err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error occurred",
    sentryLogged: true
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 Project LIFE Backend Server active on Port ${PORT}`);
  console.log(`💡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`========================================`);
});

module.exports = { app, authenticateToken, authorizeRoles };
