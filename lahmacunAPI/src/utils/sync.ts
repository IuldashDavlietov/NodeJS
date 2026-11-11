// sync():

import { mongoose } from "../configs/dbConnection";

export default async function sync(): Promise<void> {
  return;

  /* CLEAR DATABASE */
  await mongoose.connection.dropDatabase();
  console.log("- Database and all data DELETED!");
  /* CLEAR DATABASE */
}
