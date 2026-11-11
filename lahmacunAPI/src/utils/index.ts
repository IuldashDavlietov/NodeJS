import { pbkdf2Sync } from "node:crypto";
import { env } from "../configs/env";

// Password Encryption:
const passwordEncrypte = (password: string): string => {
  // require('crypto').randomBytes(32).toString('hex')
  return pbkdf2Sync(
    password,
    env.SECRET_KEY,
    env.PASS_ITERATION,
    env.PASS_KEYLEN,
    env.PASS_DIGEST,
  ).toString("hex");
};

class CustomError extends Error {
    override name = "CustomError";
    statusCode: number;
    
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }
}


export {passwordEncrypte, CustomError}