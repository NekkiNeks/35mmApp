import express from "express";

//functions
import { getUserById } from "../libs/tools/user.tools";
import { handleError } from "../libs/tools/tools";

export async function getAccountController(
  req: express.Request,
  res: express.Response
) {
  try {
    const userId = res.locals.user.userId;
    const user = await getUserById(userId);
    res.status(200).send({ status: "success", data: { user } });
  } catch (err) {
    handleError(err, res);
  }
}
