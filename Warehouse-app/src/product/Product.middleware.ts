import type { Request, Response, NextFunction } from "express";
import { CreateProductSchema } from "./product.schema.js";

export function validateCreateProduct(req: Request, res: Response, next: NextFunction): void {
    const result = CreateProductSchema.safeParse(req.body)

    if (!result.success) {
        res.status(400).json({
            errors: result.error.issues
        })
        return;
    }
    req.body = result.data
    next()
}