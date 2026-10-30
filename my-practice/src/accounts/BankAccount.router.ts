import { Router } from "express";
import { getAccount, deposit, withdraw } from "./BankAccount.controller.js";
import { validateAmount, findAccount } from "./BankAccount.middleware.js";

export const bankAccountRouter: Router = Router();
bankAccountRouter.get('/:accountNumber', findAccount, getAccount);
bankAccountRouter.post('/:accountNumber/deposit', validateAmount, findAccount, deposit)
bankAccountRouter.post('/:accountNumber/withdraw', validateAmount, findAccount, withdraw)
