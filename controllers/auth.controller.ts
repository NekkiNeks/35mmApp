import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

//funcitons
import { createUser, getUser } from "../libs/tools/user.tools";
import { handleError } from "../libs/tools/tools";

export async function registerUserController(
  req: express.Request,
  res: express.Response
) {
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: "error",
        data: {
          message: "Validation error", // need to refactor!!
          errors: errors.array(),
        },
      });
    }
    try {
      const { login, password } = req.body;
      if (!login) throw new Error("no login was provided");
      if (!password) throw new Error("no password was provided");
      if (await getUser(login)) throw new Error("user allready exists");

      const user = await createUser(login, password);
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(201).send({
        status: "success",
        data: { message: "User was created", userId: user.id, jwt: token },
      });
    } catch (err) {
      handleError(err, res);
    }
  };
}

export async function loginController(
  req: express.Request,
  res: express.Response
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      status: "error",
      data: {
        message: "Validation error",
        errors: errors.array(),
      },
    });
  }
  try {
    const { login, password } = req.body;
    const user = await getUser(login);
    if (!user) throw new Error("user doesent exist");
    if (user.password !== password) throw new Error("wrong password");

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.send({ status: "success", data: { jwt: token, userId: user.id } });
  } catch (err) {
    handleError(err, res);
  }
}
