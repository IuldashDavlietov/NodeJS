import express, { type Express } from 'express';
import { appRouter } from './app.router.js';

export const app: Express = express();
app.use(express.json());
app.use('/api/v1', appRouter);
