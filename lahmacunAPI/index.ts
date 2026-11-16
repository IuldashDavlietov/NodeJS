/*
    $ cp .env-sample .env
    $ npm i
    $ npm run swagger
    $ npm run dev
*/
import express from "express";
import { env } from "./src/configs/env";
import { dbConnection } from "./src/configs/dbConnection";
import authentication from "./src/middlewares/authentication.middleware";
import errorHandler, { notFound } from "./src/middlewares/errorHandler.middleware";
import logger from "./src/middlewares/logger.middleware";
import queryHandler from "./src/middlewares/queryHandler.middleware";
import router from "./src/routes/index.route";
// import sync from "./src/helpers/sync";

const app = express();

//* Parsers & Settings:
app.use(express.json());
app.set("query parser", "extended");

//*  DB Connection:
dbConnection();

// Authentication (uncomment after implementing JWT):
app.use(authentication);

app.use(queryHandler);
app.use(logger);

//*  Routes:
// Root welcome & healthcheck endpoint:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to LAHMACUN API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Centralized application router:
app.use("/", router);

//*  Error Handling (must stay strictly BELOW all routes):
app.all("/*splat", notFound);
app.use(errorHandler);

//*  Run Server:
app.listen(env.PORT, () => console.log("http://127.0.0.1:" + env.PORT));

//! Synchronization (keep commented in normal runs):
// sync();