import { Router, Request, Response, NextFunction } from "express";
import { TigerGraphClient } from "../services/tigergraph.js";
import { getLogger } from "../middleware/logger.js";
import {
  vehicleQuerySchema,
  fraudScoreQuerySchema,
  mileageTimelineQuerySchema,
} from "../config/schema.js";
import type { SuccessResponse } from "../types/index.js";

const router = Router();
const logger = getLogger("routes-query");
const tg = new TigerGraphClient();

/**
 * Generic query endpoint
 * GET /api/query/:graphName/:queryName
 */
router.get(
  "/:graphName/:queryName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { graphName, queryName } = req.params;
      const params = req.query;

      logger.info(
        { graphName, queryName, params },
        "Executing query"
      );

      const results = await tg.runQuery(queryName, params as Record<string, unknown>);

      const response: SuccessResponse<unknown[]> = {
        success: true,
        data: results,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Vehicle details query
 * GET /api/query/fraud-graph/vehicle_details?vin=ABC123XYZ
 */
router.get(
  "/fraud-graph/vehicle_details",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = vehicleQuerySchema.parse(req.query);

      logger.info({ vin: params.vin }, "Fetching vehicle details");

      const results = await tg.runQuery("vehicle_details", {
        vin: params.vin,
      });

      const response: SuccessResponse<unknown[]> = {
        success: true,
        data: results,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Fraud probability/score query
 * GET /api/query/fraud-graph/fraud_probability?vin=ABC123XYZ
 */
router.get(
  "/fraud-graph/fraud_probability",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = fraudScoreQuerySchema.parse(req.query);

      logger.info({ vin: params.vin }, "Calculating fraud probability");

      const results = await tg.runQuery("fraud_probability", {
        vin: params.vin,
      });

      const response: SuccessResponse<unknown[]> = {
        success: true,
        data: results,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Mileage timeline query
 * GET /api/query/fraud-graph/mileage_timeline?vin=ABC123XYZ&limit=100
 */
router.get(
  "/fraud-graph/mileage_timeline",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = mileageTimelineQuerySchema.parse(req.query);

      logger.info(
        { vin: params.vin, limit: params.limit },
        "Fetching mileage timeline"
      );

      const results = await tg.runQuery("mileage_timeline", {
        vin: params.vin,
        limit: params.limit,
        offset: params.offset,
      });

      const response: SuccessResponse<unknown[]> = {
        success: true,
        data: results,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Data sources query
 * GET /api/query/fraud-graph/data_sources?vin=ABC123XYZ
 */
router.get(
  "/fraud-graph/data_sources",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = vehicleQuerySchema.parse(req.query);

      logger.info({ vin: params.vin }, "Fetching data sources");

      const results = await tg.runQuery("data_sources", {
        vin: params.vin,
      });

      const response: SuccessResponse<unknown[]> = {
        success: true,
        data: results,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Vehicle connections query
 * GET /api/query/fraud-graph/vehicle_connections?vin=ABC123XYZ
 */
router.get(
  "/fraud-graph/vehicle_connections",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = vehicleQuerySchema.parse(req.query);

      logger.info({ vin: params.vin }, "Fetching vehicle connections");

      const results = await tg.runQuery("vehicle_connections", {
        vin: params.vin,
      });

      const response: SuccessResponse<unknown[]> = {
        success: true,
        data: results,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
