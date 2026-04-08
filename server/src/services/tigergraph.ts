import axios, { AxiosInstance } from "axios";
import { getConfig } from "../config/environment.js";
import { TigerGraphResponse } from "../types/index.js";

export class TigerGraphClient {
  private client: AxiosInstance;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    const config = getConfig();
    this.client = axios.create({
      baseURL: config.TIGERGRAPH_HOST,
      timeout: config.TIGERGRAPH_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Get or refresh authentication token
   */
  private async getToken(): Promise<string> {
    // Return existing token if still valid
    if (this.token && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.token;
    }

    const config = getConfig();

    // If token is provided in env, use it directly
    if (config.TIGERGRAPH_API_TOKEN) {
      this.token = config.TIGERGRAPH_API_TOKEN;
      // Set expiry to 1 hour from now
      this.tokenExpiry = new Date(Date.now() + 3600000);
      return config.TIGERGRAPH_API_TOKEN;
    }

    // Otherwise, request a new token
    try {
      const response = await this.client.post("/api/v1/requesttoken", {
        graph: config.TIGERGRAPH_GRAPH_NAME,
      });

      const token = response.data.token as string;
      this.token = token;
      // Set expiry based on API response
      const expiryTime = response.data.expiration || 3600; // Default to 1 hour
      this.tokenExpiry = new Date(Date.now() + expiryTime * 1000);

      return token;
    } catch (error) {
      throw new TigerGraphError("Failed to authenticate with TigerGraph", error);
    }
  }

  /**
   * Execute a GSQL query
   */
  async executeQuery<T>(
    graphName: string,
    queryName: string,
    params: Record<string, unknown> = {},
    data?: Record<string, unknown>
  ): Promise<T[]> {
    try {
      const token = await this.getToken();

      const url = `/api/v1/query/${data?.graph || graphName}/${queryName}`;

      const response = await this.client.post<TigerGraphResponse<T>>(
        url,
        data || params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: Object.keys(params).length > 0 ? params : undefined,
        }
      );

      // Handle query exceptions
      if (response.data.exceptions && response.data.exceptions.length > 0) {
        const exception = response.data.exceptions[0];
        throw new TigerGraphError(
          exception.message || "Query execution failed",
          null,
          exception
        );
      }

      return response.data.results || [];
    } catch (error) {
      if (error instanceof TigerGraphError) {
        throw error;
      }
      throw new TigerGraphError(
        `Failed to execute query ${queryName}`,
        error
      );
    }
  }

  /**
   * Run an installed query
   */
  async runQuery<T>(
    queryName: string,
    params: Record<string, unknown> = {}
  ): Promise<T[]> {
    try {
      const token = await this.getToken();
      const config = getConfig();

      const response = await this.client.get<TigerGraphResponse<T>>(
        `/api/v1/query/${config.TIGERGRAPH_GRAPH_NAME}/${queryName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );

      if (response.data.exceptions && response.data.exceptions.length > 0) {
        const exception = response.data.exceptions[0];
        throw new TigerGraphError(
          exception.message || "Query execution failed",
          null,
          exception
        );
      }

      return response.data.results || [];
    } catch (error) {
      if (error instanceof TigerGraphError) {
        throw error;
      }
      throw new TigerGraphError(`Failed to run query ${queryName}`, error);
    }
  }

  /**
   * Get graph information/schema
   */
  async getGraphInfo(): Promise<Record<string, unknown>> {
    try {
      const token = await this.getToken();
      const config = getConfig();

      const response = await this.client.get(
        `/api/v1/graph/${config.TIGERGRAPH_GRAPH_NAME}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new TigerGraphError("Failed to get graph info", error);
    }
  }

  /**
   * Health check - verify connection
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get("/api/v1/echo", {
        timeout: 5000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

/**
 * Custom error class for TigerGraph-specific errors
 */
export class TigerGraphError extends Error {
  public readonly originalError?: unknown;
  public readonly tgException?: Record<string, unknown>;

  constructor(
    message: string,
    originalError?: unknown,
    tgException?: Record<string, unknown>
  ) {
    super(message);
    this.name = "TigerGraphError";
    this.originalError = originalError;
    this.tgException = tgException;
  }
}
