import { BankAccountService } from './BankAccount.service.js';
export class BankAccountController {
  constructor(private accountService: BankAccountService) {}

  handleDeposit(accountNumber: string, amount: number): void {
    const account = this.accountService.getAccount(accountNumber);
    if (account) {
      account.deposit(amount);
    } else {
      console.log("Account not found!");
    }
  }
}