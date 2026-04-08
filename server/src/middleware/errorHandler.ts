import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { TigerGraphError } from "../services/tigergraph.js";
import { getLogger } from "./logger.js";
import { ErrorResponse } from "../types/index.js";

const logger = getLogger("error-handler");

/**
 * Custom application error
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Map TigerGraph errors to HTTP status codes and error codes
 */
function mapTigerGraphError(error: TigerGraphError): {
  statusCode: number;
  code: string;
  details?: Record<string, unknown>;
} {
  // Check if error message contains auth-related keywords
  if (
    error.message.includes("auth") ||
    error.message.includes("token") ||
    error.message.includes("unauthorized")
  ) {
    return { statusCode: 401, code: "TIGERGRAPH_AUTH_ERROR" };
  }

  // Check for connection errors
  if (
    error.message.includes("connect") ||
    error.message.includes("timeout") ||
    error.message.includes("ECONNREFUSED")
  ) {
    return { statusCode: 503, code: "TIGERGRAPH_CONNECTION_ERROR" };
  }

  // Check for query errors
  if (
    error.message.includes("query") ||
    error.tgException?.message
  ) {
    return {
      statusCode: 400,
      code: "QUERY_ERROR",
      details: error.tgException,
    };
  }

  // Default server error
  return { statusCode: 500, code: "TIGERGRAPH_ERROR" };
}

/**
 * Error handling middleware
 */
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = 500;
  let code = "INTERNAL_SERVER_ERROR";
  let message = "An unexpected error occurred";
  let details: Record<string, unknown> | undefined;

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    statusCode = 400;
    code = "VALIDATION_ERROR";
    message = "Request validation failed";
    details = error.flatten().fieldErrors;
  }
  // Handle TigerGraph errors
  else if (error instanceof TigerGraphError) {
    const { statusCode: sc, code: c, details: d } = mapTigerGraphError(error);
    statusCode = sc;
    code = c;
    message = error.message;
    details = d;

    logger.warn(
      {
        code,
        message,
        originalError: error.originalError instanceof Error
          ? error.originalError.message
          : String(error.originalError),
      },
      "TigerGraph error"
    );
  }
  // Handle custom app errors
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
    details = error.details;
  }
  // Handle standard errors
  else if (error instanceof Error) {
    logger.error(
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      "Unhandled error"
    );
  } else {
    logger.error({ error }, "Unknown error type");
  }

  const response: ErrorResponse = {
    error: {
      message,
      code,
      details,
    },
  };

  res.status(statusCode).json(response);
}

/**
 * 404 handler - must be registered after all routes
 */
export function notFoundHandler(_req: Request, res: Response): void {
  const response: ErrorResponse = {
    error: {
      message: "Route not found",
      code: "NOT_FOUND",
    },
  };
  res.status(404).json(response);
}
