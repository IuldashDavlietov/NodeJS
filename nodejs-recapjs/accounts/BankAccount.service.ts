// accounts/BankAccount.service.ts

import { BankAccount } from './BankAccount.entity.js';

export class BankAccountService {
  private accounts: BankAccount[] = [];

  createAccount(accountNumber: string, initialBalance: number): BankAccount {
    const newAccount = new BankAccount(accountNumber, initialBalance);
    this.accounts.push(newAccount);
    return newAccount;
  }

  getAccount(accountNumber: string): BankAccount | undefined {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }
}