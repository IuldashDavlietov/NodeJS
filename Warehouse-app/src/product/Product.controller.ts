import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import { Product } from './product.entity.js';
import type { CreateProductInput } from './product.schema.js';

export class ProductController {
    public createProduct = (req: Request, res: Response): void => {

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
    };
}

