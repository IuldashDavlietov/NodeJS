import type { Request, Response, NextFunction } from "express";
import { BankAccount } from "./BankAccount.entity.js";

export function validateAmount(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' })
    }
    next()
}

export const bankAccountStore = new Map<string, BankAccount>();
const testBankAccount = new BankAccount('DE1234', 1000);
bankAccountStore.set(testBankAccount.accountNumber, testBankAccount)

export function findAccount(req: Request, res: Response, next: NextFunction) {
    const { accountNumber } = req.params;
    if (typeof accountNumber !== 'string') {
        return res.status(400).json({ message: 'Invalid Account number' })
    }
    const account = bankAccountStore.get(accountNumber)
    if (!account) {
        return res.status(404).json({
            message: 'Account number not found'
        })
    }
    res.locals.account = account
    next()

}