import express, { type Express } from 'express';
import { appRouter } from './app.router.js';
import { loggerMiddleware } from './shared/middlewares/logger.middleware.js';
import { errorMiddleware } from './shared/middlewares/error.middleware.js';

export const app: Express = express();

// 1. Parse incoming JSON 
app.use(express.json());

// 2. HTTP request logging pipeline (Pino)
app.use(loggerMiddleware);

// 3. API route 
app.use('/api/v1', appRouter);

// 4. Global error handling middleware 
app.use(errorMiddleware);