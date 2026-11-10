import type { Request, Response, NextFunction } from 'express';
import { InvalidWeight, InvalidDimension } from '../../product/product.entity.js';
import { logger } from '../lib/logger.js';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof InvalidWeight || err instanceof InvalidDimension) {
        res.status(400).json({ error: err.message });
        return;
    }
    const log = req.log ?? logger;
    log.error({ err }, 'Unhandled system error');

    res.status(500).json({ error: 'Internal Server Error' });
}