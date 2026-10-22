import { Router } from "express";
import { validateAmount } from "./BankAccount.middleware.js";
import { BankAccount } from "./BankAccount.entity.js";
import type { Request, Response } from "express";


export const bankAccountRouter: Router = Router();
const myAccount = new BankAccount('DE1234567890', 1500);



bankAccountRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        accountNumber: myAccount.accountNumber,
        balance: myAccount.getBalance()
    })
})

    .post('/deposit', validateAmount, (req: Request, res: Response) => {
        try {
            const { amount } = req.body;
            myAccount.deposit(amount)
            res.status(200).json({
                success: true,
                balance: myAccount.getBalance()
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Deposi failed'
            return res.status(400).json({
                error: message
            })
        }
    })
    
    .post('/withdraw', validateAmount, (req: Request, res: Response) => {
        try {
            const { amount } = req.body
            myAccount.withdraw(amount)
            return res.status(200).json({
                success: true,
                balance: myAccount.getBalance()
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Withdraw failed';
            return res.status(400).json({
                error: message
            })
        }
    })



