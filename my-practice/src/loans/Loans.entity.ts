export class InvalidRepaymentAmountError extends Error {
    constructor() {
        super('Repayment amount must be greater than 0')
        this.name = 'InvalidRepaymentAmountError'
    }
}

export class LoanAlreadyPaidError extends Error {
    constructor() {
        super('Loan is already fully repaid');
        this.name = 'LoanAlreadyPaidError'
    }
}

export class ExceededRepaymentError extends Error {
    constructor() {
        super('Repayment amount exceeds remaining balance')
        this.name = 'ExceededRepaymentError'
    }
}


export class Loan {
    public readonly loanId: string;
    private _totalAmount: number;
    private _remainingAmount: number;
    private _isPaid: boolean = false;

    constructor(loanId: string, initialAmount: number) {
        this.loanId = loanId;
        this._totalAmount = initialAmount;
        this._remainingAmount = initialAmount;
    }

    get totalAmount(): number {
        return this._totalAmount
    }
    get remainingAmount(): number {
        return this._remainingAmount
    }
    get isPaid(): boolean {
        return this._isPaid
    }

    private ensurePositiveAmount(amount: number): void {
        if (amount <= 0) {
            throw new InvalidRepaymentAmountError()
        }
    }

    public repay(amount: number): void {
        this.ensurePositiveAmount(amount)

        if (this._isPaid) {
            throw new LoanAlreadyPaidError()
        }
        if (amount > this._remainingAmount) {
            throw new ExceededRepaymentError()
        }

        this._remainingAmount -= amount;
        if (this._remainingAmount === 0) {
            this._isPaid = true;
        }
    }
}