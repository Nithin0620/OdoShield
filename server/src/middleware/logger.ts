import pino from "pino";
import pinoHttp from "pino-http";
import { getConfig } from "../config/environment.js";

// Create base logger instance
const baseLogger = pino({
  level: getConfig().LOG_LEVEL,
});

// Create request logger middleware
export const requestLogger = pinoHttp(
  {
    logger: baseLogger,
    level: getConfig().LOG_LEVEL,
  }
);

/**
 * Get a named logger instance
 */
export function getLogger(name: string) {
  return baseLogger.child({ module: name });
}

/**
 * Export base logger for root-level logging
 */
export const logger = baseLogger;
