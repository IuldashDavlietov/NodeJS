import type { Request, Response } from "express";
import { BankCard } from "./BankCard.entity.js";

export function getBankCard(req: Request, res: Response): Response | void {
    const card = res.locals.card as BankCard

    res.status(200).json({
        cardNumber: card.cardNumber,
        holderName: card.holderName,
        isBlocked: card.getIsBlocked()
    })
}
