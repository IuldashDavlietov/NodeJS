import { Router } from "express";
import { bankAccountRouter } from "./accounts/BankAccount.router.js";
import { bankCardRouter } from "./cards/BankCard.router.js";

export const apiRouter: Router = Router();

const routes = [
    { path: '/account', router: bankAccountRouter },
    { path: '/cards', router: bankCardRouter }
]



routes.forEach(({ path, router }) => {
    apiRouter.use(path, router)
})