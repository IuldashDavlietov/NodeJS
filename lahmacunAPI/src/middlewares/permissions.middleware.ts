import type { RequestHandler } from "express";
import { CustomError } from "../utils";

const isLogin: RequestHandler = (req, res, next) => {
  if (req.user && req.user.isActive) {
    next();
  } else {
    res.statusCode = 403;
    throw new CustomError("NoPermission: You must login.", 403);
  }
};


const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user && req.user.isActive && req.user.isAdmin) {
    next();
  } else {
    throw new CustomError("NoPermission: You must login and to be Admin.", 403);
  }
};

export { isLogin,isAdmin};
