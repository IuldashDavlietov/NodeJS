import type { RequestHandler } from "express";
import { CustomError } from "../utils";

const isLogin: RequestHandler = (req, res, next) => {
  if (!req.user) throw new CustomError("NoPermission: You must login!", 403);
  next();
};

const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) throw new CustomError("NoPermission: You must login!", 403);
  if (!req.user.isAdmin) throw new CustomError("NoPermission: You must be admin!", 403);

  next();
};

const isAdminOrLead: RequestHandler = (req, res, next) => {
  if (!req.user) throw new CustomError("NoPermission: You must login!", 403);
  if (!(req.user.isAdmin || req.user.isLead))
    throw new CustomError("NoPermission: You must be admin or lead!", 403);

  next();
};



export { isLogin, isAdmin, isAdminOrLead };
