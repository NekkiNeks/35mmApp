import express from "express";

//functions
import { getUser } from "../libs/tools/user.tools";
import { handleError } from "../libs/tools/tools";

export async function getUsersController(
  req: express.Request,
  res: express.Response
) {
  const login = req.params.login;
  try {
    const user = await getUser(login, { noPassword: true });
    res.send({
      status: "success",
      data: { user: user },
    });
  } catch (err) {
    handleError(err, res);
  }
}
