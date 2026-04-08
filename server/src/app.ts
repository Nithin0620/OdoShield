import express, { Express } from "express";
import { requestLogger, getLogger } from "./middleware/logger.js";
import { setupSecurityMiddleware } from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/health.js";
import queryRoutes from "./routes/query.js";

const logger = getLogger("app");

/**
 * Create and configure Express application
 */
export function createApp(): Express {
  const app = express();

  // Request logging middleware (must be first)
  app.use(requestLogger);

  // Security middleware
  setupSecurityMiddleware(app);

  // Health check (before /api prefix)
  app.get("/", (_req, res) => {
    res.json({
      name: "OdoShield API",
      version: "1.0.0",
      status: "running",
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use("/api", healthRoutes);
  app.use("/api/query", queryRoutes);

  // 404 handler (after all routes)
  app.use(notFoundHandler);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  logger.info("Express app created and configured");

  return app;
}
