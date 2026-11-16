export class AppError extends Error {
    public readonly statusCode: number;

    constructor(messsage: string, statusCode: number) {
        super(messsage)
        this.statusCode = statusCode;
        this.name = new.target.name
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Reosurce not found') {
        super(message, 404)
    }
}