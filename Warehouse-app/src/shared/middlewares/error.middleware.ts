import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { logger } from "../lib/logger.js";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
        return;
    }
    const log = req.log ?? logger
    log.error({ err }, 'Unhandled system error')

    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    })
}
