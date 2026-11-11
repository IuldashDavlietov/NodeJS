// https://swagger-autogen.github.io/docs/

import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";
import packageJson from "./package.json";

dotenv.config({ quiet: true });

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
    // termOfService: "htttp://127.0.0.1:8000/#",
    contact: { name: packageJson.author, email: packageJson.email },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Simple Token Authentication * Example Use: <b>Token ...tokenKey...</b>",
    },
  },
  security: [{ Token: [] }],

  // paths will be created by swaggerAutogen

  //   definitions: {
  //     Department: Department.schema.obj,
  //     Personnel: Personnel.schema.obj,
  //   },
};

// to run swagger.autgen.ts file: npm run swagger
swaggerAutogen()('./swagger.json', ['./index'], document)