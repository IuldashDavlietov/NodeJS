import type { HydratedDocument, Types } from "mongoose";
import { mongoose } from "../configs/dbConnection";

export interface IToken {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TokenBody = Pick<IToken, "token">;
export type TokenDocument = HydratedDocument<IToken>;

const tokenSchema = new mongoose.Schema<IToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
      required: true,
      unique: true, // one to one relationship with Personnel
    },

    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true, // for faster search
    },
  },
  { collection: "tokens", timestamps: true },
);

export default mongoose.model<IToken>("Token", tokenSchema);
