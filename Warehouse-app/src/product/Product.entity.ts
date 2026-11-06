export interface Dimensions {
    length: number,
    width: number,
    height: number
}

export class InvalidWeight extends Error {
    constructor() {
        super('Product weight must be positive number')
        this.name = 'InvalidWeight'
    }
}

export class InvalidDimension extends Error {
    constructor() {
        super('Product dimension must be positive number')
        this.name = 'InvalidDimension'
    }
}

export class Product {
    constructor(
        public readonly id: string,
        public name: string,
        public sku: string,
        public barcode: string,
        public weight: number,
        public dimensions: Dimensions,
        public isFragile: boolean,
        public temperatureZone: ('DRY' | 'CHILLED' | 'FROZEN'),
        public description?: string,
    ) {
        this.validate()
    }

    get volume(): number {
        return this.dimensions.height * this.dimensions.length * this.dimensions.width
    }

    private validate(): void {
        if (this.weight <= 0) {
            throw new InvalidWeight()
        }
        if (this.dimensions.length <= 0 || this.dimensions.width <= 0 || this.dimensions.height <= 0) {
            throw new InvalidDimension()
        }
    }
}