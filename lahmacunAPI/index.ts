/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm i
    $ npm run swagger
    $ npm run dev
*/
import express from "express";
import { env } from "./src/configs/env";
import { dbConnection } from "./src/configs/dbConnection";
// import authentication from "./src/middlewares/authentication";
import errorHandler, { notFound } from "./src/middlewares/errorHandler";
import logger from "./src/middlewares/logger";
import queryHandler from "./src/middlewares/queryHandler";
import router from "./src/routes/index";
// import sync from "./src/helpers/sync";

const app = express();

// Nested Query
app.set("query parser", "extended");

// DB Connection:
dbConnection();

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());

// // Express 5 leaves req.body undefined when no body is sent.
// app.use((req, res, next) => {
//   req.body ??= {};
//   next();
// });

// Auhentication:
// app.use(authentication);

// Query Handler
app.use(queryHandler);

// Logger:
app.use(logger);

/* ------------------------------------------------------- */
//* Routes:

// HomePath
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

// Other path
app.use("/", router);

/* ------------------------------------------------------- */
//* Error Handling

// Not found handler
app.all("/*splat", notFound);

// Error handler
app.use(errorHandler);

/* ------------------------------------------------------- */
// RUN SERVER:
app.listen(env.PORT, () => console.log("http://127.0.0.1:" + env.PORT));

/* ------------------------------------------------------- */
//! Syncronization (must be in commentLine):
// sync();
