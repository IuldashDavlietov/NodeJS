import { Router } from "express";
import { getAccount, deposit, withdraw } from "./BankAccount.controller.js";
import { validateAmount } from "./BankAccount.middleware.js";

export const bankAccountRouter: Router = Router();
bankAccountRouter.get('/:accountNumber', getAccount);
bankAccountRouter.post('/:accountNumber/deposit', validateAmount, deposit)
bankAccountRouter.post('/:accountNumber/withdraw',validateAmount, withdraw )
