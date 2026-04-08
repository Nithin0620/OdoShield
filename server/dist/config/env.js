"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    tigergraph: {
        host: process.env.TG_HOST || 'http://localhost:9000',
        graph: process.env.TG_GRAPH || 'OdoShield_FraudGraph',
        secret: process.env.TG_SECRET || '',
        token: process.env.TG_TOKEN || '',
    }
};
