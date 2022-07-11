import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

//models
import User from "../models/User";

router.post(
  "/register",
  [
    check("login", "Please enter the login").notEmpty(),
    check("password", "Password must be more then 6 length").isLength({
      min: 6,
    }),
  ],
  async (req: express.Request, res: express.Response) => {
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
      const { login, password }: { login: string; password: string } = req.body;
      const userExist = await checkUserExist(login);
      if (userExist) {
        return res
          .status(409)
          .send({ status: "error", data: { message: "user exists" } });
      }
      const user = await createUser(login, password);
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(201).send({
        status: "success",
        data: { message: "User was created", userId: user.id, jwt: token },
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send({ status: error, message: error.message });
    }
  }
);

router.post(
  "/login",
  [
    check("login", "please enter login").notEmpty(),
    check("password", "please enter password").notEmpty(),
  ],
  async (req: express.Request, res: express.Response) => {
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
      const userExist = await checkUserExist(login);
      if (!userExist) {
        return res
          .status(409)
          .send({ status: "error", data: { message: "user doesnt exist" } });
      }
      const user = await getUser(login);
      if (!user) {
        return res.status(500).send({
          status: "error",
          data: { message: "cant find user" },
        });
      }
      if (user.password !== password) {
        return res
          .status(400)
          .send({ status: "error", data: { message: "wrong password" } });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.send({ status: "success", data: { jwt: token, userId: user.id } });
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .send({ status: error, data: { message: error.message } });
    }
  }
);

async function checkUserExist(login: string): Promise<boolean> {
  const res = await User.findOne({ login });
  return !!res;
}

async function createUser(login: string, password: string) {
  try {
    const user = await User.create({ login, password });
    return { id: user._id };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    throw new Error("Error: cant create user");
  }
}

async function getUser(login: string) {
  try {
    const user = await User.findOne({ login });
    return user;
  } catch (error) {
    throw new Error("Error: cant find user");
  }
}

module.exports = router;
