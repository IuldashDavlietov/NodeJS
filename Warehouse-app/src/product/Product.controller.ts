import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import { Product, InvalidWeight, InvalidDimension } from './product.entity.js';
import type { CreateProductInput } from './product.schema.js';

export class ProductController {
    public createProduct = (req: Request, res: Response): void => {
        try {
            const input: CreateProductInput = req.body;
            const id = crypto.randomUUID();
            const product = new Product(
                id,
                input.name,
                input.sku,
                input.barcode,
                input.weight,
                input.dimensions,
                input.isFragile,
                input.temperatureZone,
                input.description
            );
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof InvalidWeight || error instanceof InvalidDimension) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}