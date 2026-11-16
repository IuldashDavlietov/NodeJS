import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/app.error.js';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
    const notFound = new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`);
    next(notFound);
}
