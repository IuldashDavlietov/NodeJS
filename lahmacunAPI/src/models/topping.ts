import { mongoose } from "../configs/dbConnection";
import type { HydratedDocument, Types } from "mongoose";


export interface ITopping {
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export type ToppingBody = Pick<ITopping, 'name'>
export type ToppingDocument = HydratedDocument<ITopping>

const toppingSchema = new mongoose.Schema<ITopping>({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

}, { collection: 'toppings', timestamps: true });

export default mongoose.model<ITopping>("Topping", toppingSchema)


