import { mongoose } from "../configs/dbConnection";
import type { HydratedDocument, Types } from "mongoose";


export interface IToken {
    userId: Types.ObjectId,
    token: string,
    createdAt: Date,
    updatedAt: Date
}

export type TokenBody = Pick<IToken, 'token'> & { userId: string }
export type TokenDocument = HydratedDocument<IToken>

const tokenSchema = new mongoose.Schema<IToken>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true,
        index: true
    },

    token: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

}, { collection: 'tokens', timestamps: true });

export default mongoose.model<IToken>("Token", tokenSchema)


