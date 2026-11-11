import { mongoose } from "../configs/dbConnection";
import type { HydratedDocument, Types } from "mongoose";


export interface IPizza {
    name: string,
    image?: string,
    price: number,
    userId: Types.ObjectId,
    toppingIds: Types.ObjectId[],
    createdAt: Date,
    updatedAt: Date
}

export type PizzaBody = Pick<IPizza, 'name' | 'image' | 'price'> & { toppingIds?: string[] }
export type PizzaDocument = HydratedDocument<IPizza>

const pizzaSchema = new mongoose.Schema<IPizza>({

    toppingIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topping'
    }],

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        trim: true,
    },

    price: {
        type: Number,
        required: true
    }

}, { collection: 'pizzas', timestamps: true });

export default mongoose.model<IPizza>("Pizza", pizzaSchema);

