import express from "express";
const router = express.Router();
import { check } from "express-validator";


//controllers
import {
  registerUserController,
  loginController,
} from "../controllers/auth.controller";

router.post(
  "/register",
  [
    check("login", "Please enter the login").notEmpty(),
    check("password", "Password must be more then 6 length").isLength({
      min: 6,
    }),
  ],
  registerUserController
);

router.post(
  "/login",
  [
    check("login", "please enter login").notEmpty(),
    check("password", "please enter password").notEmpty(),
  ],
  loginController
);

module.exports = router;
