import { Router } from "express";
import { validateCreateProduct } from "./product.middleware.js";
import { ProductController } from "./product.controller.js";

export const productRouter: Router = Router();
const productController = new ProductController()

productRouter.post('/', validateCreateProduct, productController.createProduct)
