import { mongoose } from "../configs/dbConnection";
import { HydratedDocument } from "mongoose";

interface IDepartment {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

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