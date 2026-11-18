import { mongoose } from "../configs/dbConnection";
import type { HydratedDocument, Types } from "mongoose";


export type pizzaSize = 'Small' | 'Medium' | 'Large' | 'Xlarge';

export interface IOrder {
    userId: Types.ObjectId,
    pizzaId: Types.ObjectId,
    size: pizzaSize,
    quantity: number,
    price: number,
    amount: number,
    createdAt: Date,
    updatedAt: Date
}

export type OrderBody = Pick<IOrder, 'size'> & Partial<Pick<IOrder, 'quantity' | 'price'>> & { userId?: string, pizzaId: string }
export type OrderDocument = HydratedDocument<IOrder>

const orderSchema = new mongoose.Schema<IOrder>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
        required: true
    },

    size: {
        type: String,
        trim: true,
        required: true,
        enum: ['Small', 'Medium', 'Large', 'Xlarge']
    },

    quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer',
        },
    },

    price: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
       required: true
    },
},

    { collection: 'orders', timestamps: true });

    orderSchema.pre('validate', function () {
    if (this.quantity != null && this.price != null) {
        this.amount = this.quantity * this.price;
    }
});

export default mongoose.model<IOrder>("Order", orderSchema);
