import dotenv from "dotenv";
import { envSchema, Environment } from "./schema.js";

dotenv.config();

let config: Environment | null = null;

/**
 * Load and validate environment configuration
 * Throws on startup if required variables are missing
 */
export function loadConfig(): Environment {
  if (config) {
    return config;
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error("❌ Environment validation failed:");
    Object.entries(errors).forEach(([field, messages]) => {
      console.error(`   ${field}: ${messages?.join(", ")}`);
    });
    process.exit(1);
  }

  config = result.data;
  return config;
}

/**
 * Get the current configuration
 */
export function getConfig(): Environment {
  if (!config) {
    return loadConfig();
  }
  return config;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getConfig().NODE_ENV === "production";
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getConfig().NODE_ENV === "development";
}
