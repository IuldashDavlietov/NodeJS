/* 
- npm init -y
- npm install express dotenv mongoose cooke-session
- npm install -D typescript tsx @types/express @types/node @types/cookie-session
- npx tsc --init
- mkdir -p src/configs src/controllers src/middlewares src/models src/routes src/types src/utils
- create .env / .gitignore files
*/

import express from "express";
import { dbConnection } from "./src/configs/dbConnection";
import queryHandler from "./src/middlewares/queryHandler";
import cookieSession from "cookie-session";
import { env } from "./src/configs/env";
import errorHandler, { notFound } from "./src/middlewares/errorHandler";
import departmentRouter from './src/routes/department.route';   
import personnelRouter from './src/routes/personnel.route';   
import authRouter from './src/routes/auth.route';
import tokenRouter from './src/routes/token.route';
import authentication from "./src/middlewares/authentication";
import sync from "./src/utils/sync";
import logger from "./src/middlewares/logger";

const app = express();

// Nested Query
app.set("query parser", "extended");

// DB Connection
dbConnection();
/* ----------------------------------------------------- */
//* Middlewares

// Accept JSON
app.use(express.json());

// Query Handler
app.use(queryHandler);

// Authentication
app.use(authentication)

// Logger
app.use(logger)

/* ----------------------------------------------------- */
//* Routes

app.all("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Personnel API Service",
    session: req.session
  });
});

// Auth route
app.use('/auth', authRouter);

// Token route
app.use('/tokens', tokenRouter);

// Department route
app.use('/departments', departmentRouter);

// Personnel route
app.use('/personnels', personnelRouter);

/* ----------------------------------------------------- */
//* Error Handling 

// Not found handler
app.all("/*splat", notFound);

// Error handler
app.use(errorHandler);

/* ----------------------------------------------------- */
app.listen(8000, () => console.log("Running on port:8000"));
//! Seed data
// sync()