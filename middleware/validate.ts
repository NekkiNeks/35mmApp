import express from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

export default function validate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.method === "OPTIONS") next();

  try {
    if (!req.headers.authorization) {
      throw new Error("no authorization");
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);

    res.locals.user = decoded;
    return next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({ status: "error", data: { message: err.message } });
    }
  }
}
