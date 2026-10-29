export class InvalidAmountError extends Error {
  constructor() {
    super('Amount must be greater than 0');
    this.name = 'InvalidAmountError'
  }
}

export class InsufficientFundsError extends Error {
  constructor() {
    super('Insufficient funds');
    this.name = 'InsufficientFundsError'
  }
}

export class BankAccount {
  constructor(
    public readonly accountNumber: string,
    private balance: number
  ) { }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new InvalidAmountError()
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new InvalidAmountError()
    }
    if (amount > this.balance) {
      throw new InsufficientFundsError()
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}