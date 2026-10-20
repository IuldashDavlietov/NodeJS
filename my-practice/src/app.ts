import express, { type Express, type Request, type Response } from 'express';
import { BankAccount } from './accounts/BankAccount.entity.js';
import { Product } from './products/Product.entity.js';
import { WarehouseItem } from './products/WarehouseItem.entity.js';


const myAccount = new BankAccount("DE123456789", 1500);
myAccount.withdraw(200);
console.log(`Account balance: ${myAccount.getBalance()} €`);

const computer = new Product("Computer", 1799.00);
console.log(computer.getInfo());

const item = new WarehouseItem("BOX-101", 10);
item.restock(15);


const app: Express = express()
app.use(express.json());

app.get('/myAccount', (req: Request, res: Response) => {
    res.status(200).json({
        accountNumber: myAccount.accountNumber,
        balance: myAccount.getBalance()
    })
})

app.post('/myAccount', (req: Request, res: Response) => {
    const { amount } = req.body

    if (typeof amount !== 'number' || isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a valid number' })
    }
    if (amount <= 0) {
        return res.status(400).json({ error: 'Amount must be greater than zero' })
    }
    if (amount > myAccount.getBalance()) {
        return res.status(400).json({ error: 'Insufficient funds' })
    }
    myAccount.withdraw(amount)

    res.status(200).json({
        success: true,
        newBalance: myAccount.getBalance()

    })
})


app.post('/warehouse/restock', (req: Request, res: Response) => {
    const { amount } = req.body

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Restock amount must be a positive number' })
    }
    try {
        item.restock(amount)
        return res.status(200).json({
            success: true,
            sku: item.sku,
            newQuantity: item.getQuantity()
        })
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' })
    }
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Running at: http://127.0.0.1:8000`))