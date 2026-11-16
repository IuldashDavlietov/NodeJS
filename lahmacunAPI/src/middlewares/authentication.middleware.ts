
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../configs/env";
import { AccessData } from "../types/api";
import { CustomError } from "../utils";

const isAccessData = (value: unknown): value is AccessData =>
  typeof value === "object" &&
  value !== null &&
  "_id" in value &&
  "username" in value &&
  "email" in value &&
  "isActive" in value &&
  "isAdmin" in value;

const authentication: RequestHandler = async (req, res, next) => {
  req.user = null;

  const auth = req.headers.authorization; // Bearer ...accessToken...
  const [tokenType, tokenKey] = auth ? auth.split(" ") : []; // ['Bearer' 'accessToken']

  if (tokenType === "Bearer" && tokenKey) {
    try {
      const accessData = jwt.verify(tokenKey, env.ACCESS_KEY);
      req.user = isAccessData(accessData) ? accessData : null;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new CustomError("JWT Error: " + message, 401);
    }
  }
  next();
};

export default authentication;