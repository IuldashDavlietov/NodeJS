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

export {passwordEncrypte};