export class CardBlockedError extends Error {
    constructor() {
        super('Bank card is blocked')
        this.name = 'CardBlockedError'
    }
}
export class InvalidPinError extends Error {
    constructor() {
        super('Invalid PIN code')
        this.name = 'InvalidPinError'
    }
}
export class BankCard {
    private isBlocked: boolean = false;
    constructor(
        public readonly cardNumber: string,
        public readonly holderName: string,
        private pinCard: string
    ) { }
    public block(): void {
        this.isBlocked = true
    }
    public unblock(): void {
        this.isBlocked = false;
    }
    public getIsBlocked(): boolean {
        return this.isBlocked
    }
    public checkIsActive(): void {
        if (this.isBlocked === true) {
            throw new CardBlockedError()
        }
    }
    public checkPin(inputPin: string): void {
        if (this.pinCard !== inputPin) {
            throw new InvalidPinError()
        }
    }
}