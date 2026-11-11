/* -------------------------------------------------------
	EXPRESS - Personnel API
------------------------------------------------------- */
import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";
import packageJson from "./package.json";

dotenv.config({ quiet: true });

const HOST = process.env.HOST ?? "127.0.0.1";
const PORT = process.env.PORT ?? 8000;
/* ------------------------------------------------------- */

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
    termsOfService: "http://www.CourseName.com/#",
    contact: { name: packageJson.author, email: "developer@CourseName.com" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Simple Token Authentication * Example: <b>Token ...tokenKey...</b>",
    },
    Bearer: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "JWT Authentication * Example: <b>Bearer ...accessToken...</b>",
    },
  },
  security: [{ Token: [] }, { Bearer: [] }],
  definitions: {
    // Models:
    // User: User.schema.obj,
  },
};

const routes = ["./index.ts"];
const outputFile = "./src/configs/swagger.json";

// Create JSON file:
swaggerAutogen()(outputFile, routes, document);
