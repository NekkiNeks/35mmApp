const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// postgres connect
const { dbconfig } = require("../config");
const { Client } = require("pg");
const client = new Client(dbconfig);
client.connect();

router.post(
  "/register",
  [
    check("login", "Please enter the login").notEmpty(),
    check("password", "Password must be more then 6 length").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
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
      if (userExist) {
        return res
          .status(409)
          .send({ status: "error", data: { message: "user exists" } });
      }
      await createUser(login, password);
      res
        .status(201)
        .send({ status: "success", data: { message: "User was created" } });
    } catch (error) {
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
  async (req, res) => {
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
      if (user.password !== password) {
        return res
          .status(400)
          .send({ status: "error", data: { message: "wrong password" } });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.send({ status: "success", data: { jwt: token } });
    } catch (error) {
      res.status(500).send({ status: error, data: { message: error.message } });
    }
  }
);

async function checkUserExist(login) {
  const res = await client.query(
    `SELECT login FROM users WHERE login = '${login}'`
  );
  return res.rows.length > 0;
}

async function createUser(login, password) {
  try {
    const query = {
      text: "INSERT INTO users (login, password) VALUES ($1, $2)",
      values: [login, password],
    };
    await client.query(query);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getUser(login) {
  const res = await client.query(
    `SELECT * FROM users WHERE login = '${login}'`
  );
  const user = res.rows[0] || null;
  console.log(user);
  return user;
}

module.exports = router;
