import { RequestHandler } from "express";
import Token from "../models/token.model";
import { PersonnelDocument } from "../models/personnel.model";

const authentication: RequestHandler = async (req, res, next) => {
  req.user = null;

  // Authorization: Token ...tokenKey...
  // Authorization: ApiKey ...tokenKey...
  // Authorization: Bearer ...tokenKey...
  // Authorization: Auth ...tokenKey...
  // Authorization: X-API-KEY ...tokenKey...
  // Authorization: x-auth-token ...tokenKey...

  // Get token from header
  // console.log(req.headers.authorization);

  const auth = req.headers.authorization ?? null; // Token ...tokenKey...
  const [tokenType, tokenKey] = auth ? auth.split(" ") : [];

  if (tokenType == "Token" && tokenKey) {
    const tokenData = await Token.findOne({ token: tokenKey }).populate<{ userId: PersonnelDocument | null }>(
      "userId",
    );
    // console.log(tokenData)
    if (tokenData) req.user = tokenData.userId;
  }
//   console.log(req.user);
  next();
};

export default authentication;
