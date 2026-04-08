import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  tigergraph: {
    host: process.env.TG_HOST || 'http://localhost:9000',
    graph: process.env.TG_GRAPH || 'OdoShield_FraudGraph',
    secret: process.env.TG_SECRET || '',
    token: process.env.TG_TOKEN || '',
  }
};
