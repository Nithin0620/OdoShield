import { z } from "zod";

// Environment variable schema
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("localhost"),

  // TigerGraph configuration
  TIGERGRAPH_HOST: z.string().url("Invalid TigerGraph host URL"),
  TIGERGRAPH_USERNAME: z.string().min(1, "TigerGraph username required"),
  TIGERGRAPH_PASSWORD: z.string().min(1, "TigerGraph password required"),
  TIGERGRAPH_GRAPH_NAME: z.string().default("fraud_detection"),
  TIGERGRAPH_API_TOKEN: z.string().optional(),
  TIGERGRAPH_TIMEOUT: z.coerce.number().default(30000),

  // Logging
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  // CORS
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
});

export type Environment = z.infer<typeof envSchema>;

// Request validation schemas
export const vehicleQuerySchema = z.object({
  vin: z.string().length(17, "VIN must be 17 characters"),
  vehicle_id: z.string().optional(),
});

export const fraudScoreQuerySchema = z.object({
  vin: z.string().length(17, "VIN must be 17 characters"),
});

export const mileageTimelineQuerySchema = z.object({
  vin: z.string().length(17, "VIN must be 17 characters"),
  limit: z.coerce.number().max(1000).default(100),
  offset: z.coerce.number().default(0),
});

export const createVehicleSchema = z.object({
  vin: z.string().length(17),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  owner_id: z.string().min(1),
  registered_date: z.string().datetime(),
  mileage: z.number().nonnegative(),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
