export class BankCard {
    private isBlocked: boolean = false;

    constructor(
        public cardNumber: string,
        public holderName: string,
        private pinCard: string
    ) { }

    public block(): void {
        this.isBlocked = true
    }
    public getIsBlocked(): boolean {
        return this.isBlocked
    }
    public verifyPin(inputPin: string): boolean {
        return this.pinCard === inputPin
    }
}