import type { Request, Response, NextFunction } from "express";

export function validateAmount(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' })
    }
    next()
}