import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../config";

interface customRequest extends express.Request {
  user: string | JwtPayload;
}

module.exports = (
  req: customRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === "OPTIONS") next();

  try {
    if (!req.headers.authorization) {
      throw new Error("no authorization");
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(401)
        .send({ status: "error", data: { message: "no web token" } });
    }
  }
};
