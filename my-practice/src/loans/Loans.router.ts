import { Router } from "express";
import { getLoan, repayLoan } from "./Loans.controller.js";
import { validateRepaymentAmount } from "./Loans.middleware.js";

export const loansRouter: Router = Router();

loansRouter.get('/:loanId', getLoan);
loansRouter.post('/:loanId/repay', validateRepaymentAmount, repayLoan)
