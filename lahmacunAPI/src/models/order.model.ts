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

export type OrderBody = Pick<IOrder, 'size'> & Partial<Pick<IOrder, 'quantity' | 'price'>> & { userID: string, pizzaId: string }
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
        default: 1
    },

    price: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        default: function (this: IOrder) {
            return this.quantity * this.price
        },
        transform: function (this: IOrder) {
            return this.quantity * this.price
        },
    },
},

    { collection: 'orders', timestamps: true });

export default mongoose.model<IOrder>("Order", orderSchema);
