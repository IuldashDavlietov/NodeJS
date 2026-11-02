import type { Request, Response, NextFunction } from "express";
import { BankCard } from "./BankCard.entity.js";


export function validatePin(req: Request, res: Response, next: NextFunction) {
    const { pin } = req.body;
    if (!pin || typeof pin !== 'string' || ! /^\d{4}$/.test(pin)) {
        return res.status(400).json({
            error: 'Pin must be  a 4-digit string'
        })
    }
    next()
}

export const bankCardStore = new Map<string, BankCard>();
const testBankCard = new BankCard('12234-566789', "Iuldash D", "7744");
bankCardStore.set(testBankCard.cardNumber, testBankCard)


export function findCard(req: Request, res: Response, next: NextFunction) {
    const { cardNumber } = req.params;

    if (typeof cardNumber !== 'string') {
        return res.status(400).json({ message: 'Invalid card number' })
    }
    const card = bankCardStore.get(cardNumber)

    if (!card) {
        return res.status(404).json({ message: 'Card not found' })
    }

    res.locals.card = card
    next()
}