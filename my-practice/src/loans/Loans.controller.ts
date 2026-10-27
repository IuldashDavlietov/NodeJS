import { Loan, InvalidRepaymentAmountError, ExceededRepaymentError, LoanAlreadyPaidError } from "./Loans.entity.js";
import type { Request, Response } from "express";

export const loanStore = new Map<string, Loan>();
const testLoan = new Loan('LN-100', 500);
loanStore.set(testLoan.loanId, testLoan);

export function getLoan(req: Request, res: Response): void | Response {
    const { loanId } = req.params;

    if (typeof loanId !== 'string') {
        return res.status(400).json({ message: 'Invalid loan ID' });
    }

    const loan = loanStore.get(loanId);

    if (!loan) {
        return res.status(404).json({ message: 'Not Found' });
    }

    return res.status(200).json({
        loanId: loan.loanId,
        totalAmount: loan.totalAmount,
        remainingAmount: loan.remainingAmount,
        isPaid: loan.isPaid
    });
}

export function repayLoan(req: Request, res: Response): void | Response {
    const { loanId } = req.params;
    const { amount } = req.body;

    if (typeof loanId !== 'string') {
        return res.status(400).json({ message: 'Invalid loan ID' });
    }

    const loan = loanStore.get(loanId);

    if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
    }

    try {
        loan.repay(amount);
        return res.status(200).json({
            message: 'Repayment successful',
            remainingAmount: loan.remainingAmount,
            isPaid: loan.isPaid
        });
    } catch (error) {
        if (error instanceof InvalidRepaymentAmountError) {
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof ExceededRepaymentError) {
            return res.status(422).json({ message: error.message });
        }
        if (error instanceof LoanAlreadyPaidError) {
            return res.status(409).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
}