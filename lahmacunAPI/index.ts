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
import errorHandler, { notFound } from "./src/middlewares/errorHandler.middleware";
import logger from "./src/middlewares/logger.middleware";
import queryHandler from "./src/middlewares/queryHandler.middleware";
import router from "./src/routes/index.route";
// import sync from "./src/helpers/sync";

const app = express();

// Accept JSON:
app.use(express.json());
// Nested Query

app.set("query parser", "extended");

// DB Connection:
dbConnection();

//* Middlewares:


// Auhentication:
// app.use(authentication);

// Query Handler
app.use(queryHandler);

// Logger:
app.use(logger);


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

//* Error Handling:

// Not found handler
app.all("/*splat", notFound);
// Error handler
app.use(errorHandler);


// RUN SERVER:
app.listen(env.PORT, () => console.log("http://127.0.0.1:" + env.PORT));


//! Syncronization (must be in commentLine):
// sync();
