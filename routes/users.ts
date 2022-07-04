import express from "express";
const router = express.Router();
import { dbconfig } from "../config";
import validate from "../middleware/validate";

import { Client } from "pg";
const client = new Client(dbconfig);
client.connect();

//types
import type User from "../@types/User";

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await getUser(req.params.id);
      if (!user) {
        return res
          .status(400)
          .send({ status: "error", data: { message: "cant find user" } });
      }
      res.send({ status: "success", data: { user } });
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .send({ status: "error", data: { message: "something went wrong" } });
    }
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`put ${id}`);
  });

router
  .route("/:id/following")
  .get(async (req, res) => {
    const following = await getFollowing(req.params.id);
    res.send({ status: "success", data: { following } });
  })
  .post((req, res) => {
    const id = req.params.id;
    res.send(`${id} follow new user`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`${id} unsubscribe from user`);
  });

router.get("/:id/followers", async (req, res) => {
  const followers = getFollowers(req.params.id);

  res.send({ status: "success", data: { followers } });
});

async function getUser(id: string) {
  const res = await client.query(`SELECT * FROM users WHERE id = ${id};`);
  const data: User | undefined = res.rows[0];
  return data;
}

async function getFollowing(id: string) {
  const res = await client.query(
    `SELECT user_follow_id FROM users_follows WHERE user_id = ${id};`
  );
  const arr: string[] = [];
  res.rows.forEach((item) => arr.push(item.user_follow_id));
  return arr;
}

async function getFollowers(id: string) {
  const res = await client.query(
    `SELECT user_id FROM users_follows WHERE user_follow_id = ${id}`
  );
  const arr: string[] = [];
  res.rows.forEach((item) => arr.push(item.user_id));
  return arr;
}

module.exports = router;
