export class BankAccount {

  constructor(
    public readonly accountNumber: string,
    private balance: number
  ) { }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than 0");
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be greater than 0");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}