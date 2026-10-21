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

.post('/withdraw', validateAmount, (req: Request, res: Response) => {
    const  {amount}  = req.body;
    if (amount > myAccount.getBalance()) {
        return res.status(400).json({
            error: 'Insufficient funds'
        })
    }
    myAccount.withdraw(amount)
    return res.status(200).json({
        success: true,
        newbalance: myAccount.getBalance()
    })
})




