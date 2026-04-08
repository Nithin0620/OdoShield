import axios, { AxiosInstance } from 'axios';
import { config } from '../config/env';
import { logger } from '../utils/logger';

class TigerGraphService {
  private client: AxiosInstance;
  private graph: string;

  constructor() {
    this.graph = config.tigergraph.graph;
    
    this.client = axios.create({
      baseURL: config.tigergraph.host,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (config.tigergraph.token) {
      // Setup Bearer token if provided
      this.client.defaults.headers.common['Authorization'] = `Bearer ${config.tigergraph.token}`;
    }
  }

  /**
   * Run an installed query on TigerGraph
   * @param queryName Name of the installed query to run
   * @param params Query parameters (optional)
   */
  async runInstalledQuery<T = any>(queryName: string, params: Record<string, any> = {}): Promise<T[]> {
    try {
      const endpoint = `/query/${this.graph}/${queryName}`;
      logger.info(`Running TG Query: ${endpoint}`, { params });
      
      const response = await this.client.get(endpoint, { params });
      
      if (response.data.error) {
        throw new Error(response.data.message || 'Error executing TigerGraph query');
      }

      return response.data.results || [];
    } catch (error: any) {
      logger.error(`TigerGraph Error [${queryName}]:`, error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Verify TigerGraph connectivity
   */
  async checkHealth(): Promise<any> {
    try {
      const response = await this.client.get('/echo');
      return {
        status: 'up',
        message: response.data.message || 'Connected to TigerGraph',
      };
    } catch (error: any) {
      logger.error('TigerGraph Health Check Failed', error.message);
      return {
        status: 'down',
        error: error.message
      };
    }
  }
}

export const tgService = new TigerGraphService();
