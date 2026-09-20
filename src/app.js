import express from 'express';
import productsRouter from './routes/products.js';
import { errorHandler } from './middleware/responseHandler.js';
import { createMcpRouter } from './mcp.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());

  // Product API Routes
  app.use('/products', productsRouter);

  // MCP Endpoint
  app.use('/mcp', createMcpRouter());

  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Route not found'
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};