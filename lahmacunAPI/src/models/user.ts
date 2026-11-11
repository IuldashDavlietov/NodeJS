import { mongoose } from "../configs/dbConnection";
import { passwordEncrypte } from "../utils";
import type { HydratedDocument } from "mongoose";


export interface IUser {
    username: string,
    password: string,
    email: string,
    isActive: boolean,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}

export type UserBody = Pick<IUser, 'username' | 'password' | 'email' | 'isAdmin'>
export type UserDocument = HydratedDocument<IUser>

const userSchema = new mongoose.Schema<IUser>({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: passwordEncrypte
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, "Invalid email address."],
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

}, { collection: 'users', timestamps: true });

export default mongoose.model<IUser>("User", userSchema)
