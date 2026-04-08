import { Router, Request, Response, NextFunction } from "express";
import { TigerGraphClient } from "../services/tigergraph.js";
import type { SuccessResponse } from "../types/index.js";

const router = Router();
const tg = new TigerGraphClient();

/**
 * Health check endpoint
 * GET /api/health
 */
router.get("/health", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const isHealthy = await tg.healthCheck();

    if (isHealthy) {
      const response: SuccessResponse<{ status: string; timestamp: string }> = {
        success: true,
        data: {
          status: "healthy",
          timestamp: new Date().toISOString(),
        },
      };
      res.json(response);
    } else {
      res.status(503).json({
        error: {
          message: "Database connection failed",
          code: "SERVICE_UNAVAILABLE",
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Database stats endpoint
 * GET /api/stats
 */
router.get("/stats", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const info = await tg.getGraphInfo();

    const response: SuccessResponse<Record<string, unknown>> = {
      success: true,
      data: info,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * Readiness check endpoint
 * GET /api/ready
 */
router.get("/ready", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const isHealthy = await tg.healthCheck();

    if (isHealthy) {
      res.json({ ready: true });
    } else {
      res.status(503).json({ ready: false });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
