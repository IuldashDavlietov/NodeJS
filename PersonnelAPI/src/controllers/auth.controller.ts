import type { RequestHandler } from "express";
import Personnel from "../models/personnel.model";
import { MessageResponse } from "../types/api";
import { CustomError } from "../utils";

interface LoginBody {
  username?: string;
  email?: string;
  rememberMe?: boolean;
  password: string;
}

const login: RequestHandler<{}, MessageResponse, LoginBody> = async (req, res) => {
  const { username, email, password, rememberMe } = req.body;

  if (!(username || email) && password)
    throw new CustomError("Username or email and password are required", 400);

  // findOne makes set method works
  const user = await Personnel.findOne({
    $or: [{ username }, { email }],
    password,
  }).lean(); // returns a plain js object instead of mongoose document

  if (!user) throw new CustomError("Wrong email/username or password.", 401);

  if (!user.isActive)
    throw new CustomError("Your account is not active. Please contact your administrator.", 403);

  const { salary, description, phone, password: _, ...sessionData } = user;

  // Session
  req.session = sessionData;

  // Cookie

  if (rememberMe) req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days

  res.status(200).send({
    success: true,
    message: "Login is successful",
  });
};

const logout: RequestHandler<{}, MessageResponse> = async (req, res) => {
  // Session
  req.session = null;

  res.status(200).send({
    success: true,
    message: "Logout is successful",
  });
};

export { login, logout };
