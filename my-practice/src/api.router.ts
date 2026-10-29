import { Router } from "express";
import { bankAccountRouter } from "./accounts/BankAccount.router.js";
import { bankCardRouter } from "./cards/BankCard.router.js";
import { loansRouter } from "./loans/Loans.router.js";

export const apiRouter: Router = Router();

const routes = [
    { path: '/accounts', router: bankAccountRouter },
    { path: '/cards', router: bankCardRouter },
    {path: '/loans', router: loansRouter}
]

routes.forEach(({ path, router }) => {
    apiRouter.use(path, router)
})