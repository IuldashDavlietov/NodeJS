import type { RequestHandler } from "express";
import { CustomError } from "../utils";

const isLogin: RequestHandler = (req, res, next) => {
  if (req.user && req.user.isActive) {
    next();
  } else {
    res.errorStatusCode = 403;
    throw new CustomError("NoPermission: You must login.", 403);
  }
};

export default { isLogin };
