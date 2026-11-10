import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().min(1),
    sku: z.string(),
    barcode: z.string(),
    weight: z.number().positive(),
    dimensions: z.object({
        length: z.number().positive('Length must be positive'),
        width: z.number().positive('Width must be positive'),
        height: z.number().positive('Height must be positive')
    }),
    isFragile: z.boolean(),
    temperatureZone: z.enum(['DRY', 'CHILLED', 'FROZEN']),
    description: z.string().optional()
})

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
