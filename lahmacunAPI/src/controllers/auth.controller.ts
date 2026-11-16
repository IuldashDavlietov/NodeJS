import type { RequestHandler } from "express";
import User from "../models/user.model";
import { CustomError, passwordEncrypte } from "../utils";
import jwt from 'jsonwebtoken';
import { env } from "../configs/env";
import { MessageResponse } from "../types/api";


interface LoginBody {
    username?: string;
    email?: string;
    rememberMe?: boolean;
    password: string;
}



const login: RequestHandler<{}, any, LoginBody> = async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email) && password)
        throw new CustomError("Username or email and password are required", 400);

    // findOne makes set method works
    const user = await User.findOne({
        $or: [{ username }, { email }],
        password,
    }).lean(); // returns a plain js object instead of mongoose document

    if (!user) throw new CustomError("Wrong email/username or password.", 401);

    if (!user.isActive)
        throw new CustomError("Your account is not active. Please contact your administrator.", 403);

    // JWT Token
    const { password: psw, createdAt, updatedAt, ...accessData } = user;

    const access = jwt.sign(accessData, env.ACCESS_KEY, { expiresIn: '15m' });
    const refresh = jwt.sign({ _id: user._id }, env.REFRESH_KEY, { expiresIn: '1d' });

    res.status(200).send({
        success: true,
        message: "Login is successful",
        bearer: { access, refresh }
    });
};


const refresh: RequestHandler<{}, MessageResponse> = async (req, res) => {
    res.status(200).send({
        success: true,
        message: "Logout is successful. Delete token from your session",
    });
};


const logout: RequestHandler<{}, MessageResponse> = async (req, res) => {
    res.status(200).send({
        success: true,
        message: "Logout is successful. Delete token from your session",
    });
};

export { login, refresh,  logout };
