import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define main API routes
app.use('/api', routes);

// Base Health Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'OdoShield Server is running' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
