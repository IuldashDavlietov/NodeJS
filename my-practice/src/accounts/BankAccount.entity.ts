export class BankAccount {
  accountNumber: string;
  private balance: number;

  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposit of: ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Deposit amount must be greater than 0.");
    }
  }

  withdraw(amount: number): void {
    if (this.balance > 0 && this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew ${amount} €. Remaining balance: ${this.balance} €`);
    } else {
      console.log("Insufficient funds or invalid amount!");
    }
  }

  getBalance(): number {
    return this.balance;
  }
}