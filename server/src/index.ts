import { createApp } from "./app.js";
import { loadConfig } from "./config/environment.js";
import { getLogger } from "./middleware/logger.js";

const logger = getLogger("server");

/**
 * Start the server
 */
async function start() {
  try {
    // Load and validate configuration
    const config = loadConfig();
    logger.info(
      { port: config.PORT, host: config.HOST, env: config.NODE_ENV },
      "Configuration loaded"
    );

    // Create Express app
    const app = createApp();

    // Create HTTP server
    const server = app.listen(config.PORT, config.HOST, () => {
      logger.info(
        `🚀 Server running at http://${config.HOST}:${config.PORT}`
      );
      logger.info(`📊 TigerGraph: ${config.TIGERGRAPH_HOST}`);
      logger.info(`📈 Environment: ${config.NODE_ENV}`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}, shutting down gracefully...`);

      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error("Forced shutdown");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      logger.error({ error }, "Uncaught exception");
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason) => {
      logger.error({ reason }, "Unhandled rejection");
      process.exit(1);
    });
  } catch (error) {
    logger.error({ error }, "Failed to start server");
    process.exit(1);
  }
}

// Start the server
start();
