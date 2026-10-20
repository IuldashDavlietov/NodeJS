export class WarehouseItem {
    sku: string;
    private quantity: number;

    constructor(sku: string, quantity: number) {
        this.sku = sku
        this.quantity = quantity
    }

    restock(amount: number): void {
        if (amount > 0) {
            this.quantity += amount
            console.log(`SKU: ${this.sku}; Supply: +${amount} st.; Total: ${this.quantity} st.`)
        }
    }

    getQuantity(): number {
        return this.quantity
    }
}