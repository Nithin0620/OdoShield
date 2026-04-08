import cors from "cors";
import helmet from "helmet";
import { Express } from "express";
import { getConfig } from "../config/environment.js";
import { getLogger } from "./logger.js";

const logger = getLogger("security");

/**
 * Configure security middleware
 */
export function setupSecurityMiddleware(app: Express): void {
  const config = getConfig();

  // Helmet for HTTP headers security
  app.use(helmet());

  // CORS configuration
  const corsOptions = {
    origin: config.CORS_ORIGIN.split(",").map((o) => o.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // Request size limits
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  logger.info("Security middleware configured");
}

// Re-export express for convenience
import express from "express";
