import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', healthRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(env.port, () => {
  console.log(`🚀 MindVault AI Backend running on port ${env.port} in ${env.nodeEnv} mode`);
});
