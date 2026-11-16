import express, { type Express } from 'express';
import { appRouter } from './app.router.js';
import { loggerMiddleware } from './shared/middlewares/logger.middleware.js';
import { errorMiddleware } from './shared/middlewares/error.middleware.js';
import { notFoundMiddleware } from './shared/middlewares/not-found.middleware.js';

export const app: Express = express();

//  Parse incoming JSON 
app.use(express.json());

//  HTTP request logging pipeline (Pino)
app.use(loggerMiddleware);

//  API route 
app.use('/api/v1', appRouter);

//  Catch-all 404 handler for unmatched routes
app.use(notFoundMiddleware);
//  Global error handling middleware 
app.use(errorMiddleware);
