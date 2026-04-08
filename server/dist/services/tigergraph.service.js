"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tgService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class TigerGraphService {
    client;
    graph;
    constructor() {
        this.graph = env_1.config.tigergraph.graph;
        this.client = axios_1.default.create({
            baseURL: env_1.config.tigergraph.host,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (env_1.config.tigergraph.token) {
            // Setup Bearer token if provided
            this.client.defaults.headers.common['Authorization'] = `Bearer ${env_1.config.tigergraph.token}`;
        }
    }
    /**
     * Run an installed query on TigerGraph
     * @param queryName Name of the installed query to run
     * @param params Query parameters (optional)
     */
    async runInstalledQuery(queryName, params = {}) {
        try {
            const endpoint = `/query/${this.graph}/${queryName}`;
            logger_1.logger.info(`Running TG Query: ${endpoint}`, { params });
            const response = await this.client.get(endpoint, { params });
            if (response.data.error) {
                throw new Error(response.data.message || 'Error executing TigerGraph query');
            }
            return response.data.results || [];
        }
        catch (error) {
            logger_1.logger.error(`TigerGraph Error [${queryName}]:`, error?.response?.data || error.message);
            throw error;
        }
    }
    /**
     * Verify TigerGraph connectivity
     */
    async checkHealth() {
        try {
            const response = await this.client.get('/echo');
            return {
                status: 'up',
                message: response.data.message || 'Connected to TigerGraph',
            };
        }
        catch (error) {
            logger_1.logger.error('TigerGraph Health Check Failed', error.message);
            return {
                status: 'down',
                error: error.message
            };
        }
    }
}
exports.tgService = new TigerGraphService();
