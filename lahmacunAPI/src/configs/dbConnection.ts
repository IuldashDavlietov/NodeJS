// MongoDB Connection:

import mongoose from "mongoose";
import { env } from "./env";

const dbConnection = (): void => {
  // Connect:
  mongoose
    .connect(env.MONGODB)
    .then(() => console.log("* DB Connected * "))
    .catch((err: unknown) => console.log("* DB Not Connected * ", err));
};

export { mongoose, dbConnection };
