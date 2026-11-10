import { Router } from "express";
import { productRouter } from "./product/product.router.js";
export const appRouter: Router = Router();

const routes = [
    { path: '/products', router: productRouter }
]

routes.forEach(({ path, router }) => {
    appRouter.use(path, router)
})

