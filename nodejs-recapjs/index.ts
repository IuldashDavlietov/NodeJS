//  export class Product {
//   title: string;
//   price: number;

//   constructor(title: string, price: number) {
//     this.title = title;
//     this.price = price
//   }
//   getInfo(): string {
//     return `'title :' ${this.title} 'price :' ${this.price} `
//   }
// }

// const product = new Product('computer', 1799.00)

// console.log(product)


//  export class WarehouseItem {
//   sku: string;
//   private quantity: number;

//   constructor(sku: string, quantity: number) {
//     this.sku = sku;
//     this.quantity = quantity;
//   }
//   restock(amount: number): void {
//     this.quantity += amount;
//     console.log(`sku: ${this.sku}; supply: +${amount} st.; total: ${this.quantity} st.`);
//   }
// }

// const item = new WarehouseItem('BOX-101', 10);
// item.restock(15);


// index.ts

import { BankAccount } from './accounts/BankAccount.entity.js';


const myAccount = new BankAccount("DE123456789", 100);

myAccount.withdraw(150); 
myAccount.deposit(100);  
myAccount.withdraw(150); 
myAccount.withdraw(50);   

console.log(`Final balance: ${myAccount.getBalance()} €`);
