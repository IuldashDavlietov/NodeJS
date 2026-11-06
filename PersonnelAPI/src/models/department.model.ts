import { mongoose } from "../configs/dbConnection";
import type { HydratedDocument } from "mongoose";

export interface IDepartment {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


// What the client sends. createdAt and updatedAt are set by mongoose.
export type DepartmentBody = Pick<IDepartment, "name">;

export type DepartmentDocument = HydratedDocument<IDepartment>;

const departmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Department name is required"],
      unique: [true, "Department name must be unique"],
      minLength: [3, "Department name must be at least 3 characters long"],
      maxLength: [50, "Department name must be at most 50 characters long"],
    },
  },
  { collection: "departments", timestamps: true },
);

export default mongoose.model<IDepartment>("Department", departmentSchema);
