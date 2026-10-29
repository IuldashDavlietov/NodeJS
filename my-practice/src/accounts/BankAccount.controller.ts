import type { Request, Response } from "express";
import { BankAccount, InvalidAmountError, InsufficientFundsError } from "./BankAccount.entity.js";


export const bankAccountStore = new Map<string, BankAccount>();
const testBankAccount = new BankAccount('DE1234', 1000);
bankAccountStore.set(testBankAccount.accountNumber, testBankAccount)

export function getAccount(req: Request, res: Response): Response {
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
    return res.status(200).json({
        accountNumber: account.accountNumber,
        balance: account.getBalance()
    })
}

export function deposit(req: Request, res: Response): Response {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    if (typeof accountNumber !== 'string') {
        return res.status(400).json({ message: 'Invalid Account number' })
    }
    const account = bankAccountStore.get(accountNumber)
    if (!account) {
        return res.status(404).json({
            message: 'Account number not found'
        })
    }

    try {
        account.deposit(amount);
        return res.status(200).json({
            accountNumber: account.accountNumber,
            balance: account.getBalance()
        })
    } catch (error) {
        if (error instanceof InvalidAmountError) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })

    }
}

export function withdraw(req: Request, res: Response): Response {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    if (typeof accountNumber !== 'string') {
        return res.status(400).json({ message: 'Invalid account number' })
    }

    const account = bankAccountStore.get(accountNumber)
    if (!account) {
        return res.status(404).json({ message: 'Account number not found' })
    }

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
