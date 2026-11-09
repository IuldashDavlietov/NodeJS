import type { RequestHandler } from "express";
import Personnel from "../models/personnel.model";
import Token from "../models/token.model";
import { MessageResponse } from "../types/api";
import { CustomError, passwordEncrypte } from "../utils";

interface LoginBody {
  username?: string;
  email?: string;
  rememberMe?: boolean;
  password: string;
}

interface LoginResponse extends MessageResponse {
  token: string;
}

const login: RequestHandler<{}, LoginResponse, LoginBody> = async (req, res) => {
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

  // Token

  let token = await Token.findOne({ userId: user._id });

  if (!token) {
    token = await Token.create({
      userId: user._id,
      token: passwordEncrypte(user._id.toString() + Date.now()),
    });
  }

  res.status(200).send({
    success: true,
    message: "Login is successful",
    token: token.token,
  });
};

const logout: RequestHandler<{}, MessageResponse> = async (req, res) => {
  // Token

  // console.log(req.user);

  req.user && (await Token.deleteOne({ userId: req.user._id }));

  res.status(200).send({
    success: true,
    message: "Logout is successful",
  });
};

export { login, logout };
