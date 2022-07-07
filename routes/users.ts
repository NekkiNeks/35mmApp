import express from "express";
const router = express.Router();
import { dbconfig } from "../config";
import validate from "../middleware/validate";

import { Client } from "pg";
const client = new Client(dbconfig);
client.connect();

//functions
import { getUser, getFollowing, getFollowers } from "../libs/tools";

router.use(validate);

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await getUser(req.params.id);
      res.send({ status: "success", data: { user } });
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .send({ status: "error", data: { message: error.message } });
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

module.exports = router;
