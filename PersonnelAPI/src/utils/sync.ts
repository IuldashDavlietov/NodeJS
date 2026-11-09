// SYCHRONIZATION:

import { mongoose } from "../configs/dbConnection";
import Department from "../models/department.model";
import Personnel from "../models/personnel.model";

export default async function sync(): Promise<void> {

  /* REMOVE DATABASE */
  await mongoose.connection.asPromise();
  await mongoose.connection.dropDatabase();
  console.log("- Database and all data DELETED!");

  // Dropping the database also drops the unique indexes.
  await Department.syncIndexes();
  await Personnel.syncIndexes();
  /* REMOVE DATABASE */

  /* Department & Personnel */
  const departments = [
    "FullStack Department",
    "DevOps Department",
    "CyberSec Department",
  ];

  for (const name of departments) {
    // Department.create:
    const department = await Department.create({ name });
    console.log("- Department Added.");

    // Personnel.create:
    for (let i = 0; i < 10; i++) {
      await Personnel.create({
        departmentId: department._id,
        username: `test${name[0]}${i}`,
        password: "1234",
        firstName: "firstName",
        lastName: "lastName",
        phone: `${name[0]}123456789${i}`,
        email: `test${name[0]}${i}@site.com`,
        title: "title",
        salary: 2500,
        description: "description",
        isActive: true,
        isAdmin: false,
        isLead: false,
        startedAt: new Date("2023-10-15 13:14:15"),
      });
    }
    console.log("- Personnels Added.");
  }
  /* Department & Personnel */
}
