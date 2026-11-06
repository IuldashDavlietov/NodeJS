import mongoose from "mongoose";
import { env } from "./env";

const dbConnection = async (): Promise<void> => {
    await mongoose
        .connect(env.MONGODB)
        .then(() => console.log('* DB connected'))
        .catch((err: unknown) => {
            console.log('! DB Connected !')
            throw err;
        })
}

export {dbConnection, mongoose};
