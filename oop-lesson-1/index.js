class Car {
    isRunning = false

    constructor(brand, model, year) {
        this.brand = brand
        this.model = model
        this.year = year
    }
    runEngine() {
        this.isRunning = true
        console.log('engine started');
        return this.isRunning
    }
}
class Car {
    isRunning = false


    constructor(brand, model, year){
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(){
        this.isRunning = true
        console.log('engine started');
        return this.isRunning
    }
}

const myCar = new Car('Ford', 'Mustang', 1967);
console.log(myCar)
// myCar.isRunning = true
console.log(myCar.isRunning)
console.log(myCar.runEngine())

const mercedes = new Car('Mercedes', 'clk200', 2020)
console.log(mercedes);