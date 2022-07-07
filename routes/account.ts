import express from "express";
const router = express.Router();
import validate from "../middleware/validate";

// functions
import { getUser, getFollowers, getFollowing } from "../libs/tools";

router.use(validate);

router.get("/", validate, async (req, res) => {
  const userId = res.locals.user.userId;
  if (!userId) {
    return res
      .status(401)
      .send({ status: "error", data: { message: "no userId" } });
  }
  const user = await getUser(userId);
  res.status(200).send({ status: "success", data: { user } });
});

router.get("/followers", async (req, res) => {
  const user = res.locals.user;
  const followers = await getFollowers(user.id);
  if (!followers)
    res.status(500).send({
      status: "error",
      data: { message: `cant find followers for user ${user.id}` },
    });
  res.send({ status: "success", data: { followers } });
});

module.exports = router;
