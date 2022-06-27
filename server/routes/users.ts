import express from "express";
const router = express.Router();
const { dbconfig } = require("../config").default;

import { Client } from "pg";
const client = new Client(dbconfig);
client.connect();

router
  .route("/:id")
  .get((req, res) => {
    getUser(req.params.id).then((responce) => res.send(responce));
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`put ${id}`);
  });

router
  .route("/:id/following")
  .get((req, res) => {
    getFollowing(req.params.id).then((responce) => res.send(responce));
  })
  .post((req, res) => {
    const id = req.params.id;
    res.send(`${id} follow new user`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`${id} unsubscribe from user`);
  });

router.get("/:id/followers", (req, res) => {
  getFollowers(req.params.id).then((responce) => res.send(responce));
});

async function getUser(id: string) {
  const res = await client.query(`SELECT * FROM users WHERE id = ${id};`);
  const data = res.rows[0];
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
