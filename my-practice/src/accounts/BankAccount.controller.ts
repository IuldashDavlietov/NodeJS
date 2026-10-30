import type { Request, Response } from "express";
import { BankAccount, InvalidAmountError, InsufficientFundsError } from "./BankAccount.entity.js";



export const bankAccountStore = new Map<string, BankAccount>();
const testBankAccount = new BankAccount('DE1234', 1000);
bankAccountStore.set(testBankAccount.accountNumber, testBankAccount)

export function getAccount(req: Request, res: Response): Response {
    const account = res.locals.account as BankAccount;

    return res.status(200).json({
        accountNumber: account.accountNumber,
        balance: account.getBalance()
    })
}

export function deposit(req: Request, res: Response): Response {
    const { amount } = req.body;
    const account = res.locals.account as BankAccount;

    try {
        account.deposit(amount);
        return res.status(200).json({
            accountNumber: account.accountNumber,
            balance: account.getBalance()
        });
    } catch (error) {
        if (error instanceof InvalidAmountError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export function withdraw(req: Request, res: Response): Response {
    const { amount } = req.body;
    const account = res.locals.account as BankAccount;

    try {
        account.withdraw(amount);
        return res.status(200).json({
            accountNumber: account.accountNumber,
            balance: account.getBalance()
        })
    } catch (error) {
        if (error instanceof InvalidAmountError) {
            return res.status(400).json({ message: error.message })
        }
        if (error instanceof InsufficientFundsError) {
            return res.status(400).json({ message: error.message })
        }
    }
    return res.status(500).json({ message: 'Internal server error' })
}
