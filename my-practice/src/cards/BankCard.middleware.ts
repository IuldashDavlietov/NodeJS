import type { Request, Response, NextFunction } from "express";

export function validatePin(req: Request, res: Response, next: NextFunction) {
    const { pin } = req.body;

    if (!pin || typeof pin !== 'string' || pin.length !== 4) {
        return res.status(400).json({
            error: 'Pin must be  a 4-digit string'
        })
    }
    next()
}