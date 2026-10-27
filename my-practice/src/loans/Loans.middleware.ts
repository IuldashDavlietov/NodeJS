import type { Request, Response, NextFunction } from "express";

export function validateRepaymentAmount(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
            message: 'Invalid amount'
        })
    }
    next()
}