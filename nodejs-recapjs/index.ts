class Product {
  title: string;
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price
  }
  getInfo(): string {
    return `'title :' ${this.title} 'price :' ${this.price} `
  }
}

const product = new Product('computer', 1799.00)

console.log(product)


class WarehouseItem {
  sku: string;
  private quantity: number;

  constructor(sku: string, quantity: number) {
    this.sku = sku;
    this.quantity = quantity;
  }
  restock(amount: number): void {
    this.quantity += amount;
    console.log(`sku: ${this.sku}; supply: +${amount} st.; total: ${this.quantity} st.`);
  }
}

const item = new WarehouseItem('BOX-101', 10);
item.restock(15);

class BankAccount {
  accountNumber: string
  private balance: number

  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber
    this.balance = balance
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount
      console.log(`'Deposit of: ${amount}. New balance: ${this.balance}'`)
    } else {
      console.log("Deposit amount must be greater than 0.")
    }
  }

  withdraw(amount: number): void {
    if (this.balance > 0 && this.balance >= amount) {
      this.balance -= amount
      console.log(`"Withdrew ${amount} €. Remaining balance: ${this.balance} €"`)
    } else {
      console.log("Insufficient funds or invalid amount!")
    }
  }

  getBalance(): number {
    return this.balance
  }
}
const myAccount = new BankAccount("DE123456789", 100);

myAccount.withdraw(150); 
myAccount.deposit(100);  
myAccount.withdraw(150); 
myAccount.withdraw(50);   

myAccount.getBalance()