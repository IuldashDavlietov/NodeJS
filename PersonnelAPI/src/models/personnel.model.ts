import type { HydratedDocument, Types } from "mongoose";
import { mongoose } from "../configs/dbConnection";
import { passwordEncrypte } from "../utils";

export interface IPersonnel {
  departmentId: Types.ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  title: string;
  salary: number;
  description: string;
  isActive: boolean;
  isAdmin: boolean;
  isLead: boolean;
  startedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PersonnelBody = Pick<
  IPersonnel,
  "username" | "password" | "firstName" | "lastName" | "phone" | "email" | "title" | "description"
>;

export type PersonnelDocument = HydratedDocument<IPersonnel>;

const personnelSchema = new mongoose.Schema<IPersonnel>(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password:{
        type: String,
        trim: true,
        required: true,
        set: passwordEncrypte
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [/^\d{11}$/, "Invalid phone number."],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, "Invalid email address."],
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
        type: Number,
        default: 0,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLead: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },

},
  { collection: "personnels", timestamps: true },
);

export default mongoose.model<IPersonnel>("Personnel", personnelSchema);