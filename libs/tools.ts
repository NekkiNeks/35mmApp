import express from "express";
const router = express.Router();
import { dbconfig } from "../config";

import { Client } from "pg";
const client = new Client(dbconfig);
client.connect();

//models
import User from "../models/User";

export async function getUser(id: string) {
  try {
    const user = User.findById(id);
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`cant find user ${id}`);
    }
  }
}

export async function getFollowing(id: string) {
  const res = await client.query(
    `SELECT user_follow_id FROM users_follows WHERE user_id = ${id};`
  );
  const arr: string[] = [];
  res.rows.forEach((item) => arr.push(item.user_follow_id));
  return arr;
}

export async function getFollowers(id: string) {
  const res = await client.query(
    `SELECT user_id FROM users_follows WHERE user_follow_id = ${id}`
  );
  const arr: string[] = [];
  res.rows.forEach((item) => arr.push(item.user_id));
  return arr;
}
