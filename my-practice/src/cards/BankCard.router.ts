import { Router } from "express";
import { BankCard } from "./BankCard.entity.js";
import type { Request, Response } from "express";
import { validatePin } from "./BankCard.middleware.js";


export const bankCardRouter: Router = Router();
const myCard = new BankCard('1111-2222-3333-4444', 'Iuldash Davlietov', '1234')

bankCardRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        cardNumber: myCard.cardNumber,
        holdername: myCard.holderName,
        status: myCard.getIsBlocked()
    })
})
    .post('/verify-pin', validatePin, (req: Request, res: Response) => {
        const { pin } = req.body;

        if (myCard.verifyPin(pin)) {
            return res.status(200).json({
                success: true,
                message: 'PIN code verified'
            })
        }
        return res.status(401).json({
            error: "Invalid PIN code"
        })
    })