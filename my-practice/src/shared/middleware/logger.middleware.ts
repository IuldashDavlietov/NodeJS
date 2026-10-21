import type { Request, Response, NextFunction } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    console.log(`{
        dateAt: ${timestamp},
        method: ${req.method},
        url: ${req.url}
    }`)
    next()
}