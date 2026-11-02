import type { Request, Response } from "express";
import { BankCard, CardBlockedError, InvalidPinError } from "./BankCard.entity.js";

export function getBankCard(req: Request, res: Response): Response {
    const card = res.locals.card as BankCard
    return res.status(200).json({
        cardNumber: card.cardNumber,
        holderName: card.holderName,
        isBlocked: card.getIsBlocked()
    })
}

export function blockCard(req: Request, res: Response): Response {
    const card = res.locals.card as BankCard
    card.block()
    return res.status(200).json({
        cardNumber: card.cardNumber,
        holderName: card.holderName,
        isBlocked: card.getIsBlocked()
    })
}

export function unblockCard(req: Request, res: Response): Response {
    const card = res.locals.card as BankCard
    card.unblock();
    return res.status(200).json({
        cardNumber: card.cardNumber,
        holderName: card.holderName,
        isBlocked: card.getIsBlocked()
    })
}

export function verifyPin(req: Request, res: Response): Response {
    const card = res.locals.card as BankCard
    const { pin } = req.body
    try {
        card.checkIsActive();
        card.checkPin(pin);
        return res.status(200).json({
            cardNumber: card.cardNumber,
            holderName: card.holderName,
            isBlocked: card.getIsBlocked()
        })
    } catch (error) {
        if (error instanceof InvalidPinError) {
            return res.status(401).json({ message: error.message })
        }
        if (error instanceof CardBlockedError) {
            return res.status(403).json({ message: error.message })
        }
    }
    return res.status(500).json({ message: 'Internal server error' })
}
