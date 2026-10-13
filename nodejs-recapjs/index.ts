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

console.log( product)
