import { Router } from "express";
import { BankCard } from "./BankCard.entity.js";
import type { Request, Response } from "express";
import { validatePin } from "./BankCard.middleware.js";


export const bankCardRouter: Router = Router();
