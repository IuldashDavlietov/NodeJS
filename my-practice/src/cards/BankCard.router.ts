import { Router } from "express";
import { validatePin, findCard } from "./BankCard.middleware.js";
import { getBankCard, verifyPin, blockCard, unblockCard } from "./BankCard.controller.js";

export const bankCardRouter: Router = Router();

bankCardRouter.param('cardNumber', findCard);

bankCardRouter.get('/:cardNumber', getBankCard);
bankCardRouter.post('/:cardNumber/block', blockCard);
bankCardRouter.post('/:cardNumber/unblock', unblockCard);
bankCardRouter.post('/:cardNumber/verification', validatePin, verifyPin);