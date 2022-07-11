import express from "express";
const router = express.Router();
import validate from "../middleware/validate";

//models
import User from "../models/User";

// functions
import { getUserById } from "../libs/tools";

router.use(validate);

router.get("/", async (req, res) => {
  const userId = res.locals.user.userId;
  if (!userId) {
    return res
      .status(401)
      .send({ status: "error", data: { message: "no userId" } });
  }
  const user = await getUserById(userId);
  res.status(200).send({ status: "success", data: { user } });
});

// router.get("/followers", async (req, res) => {
//   const user = res.locals.user;
//   const followers = await getFollowers(user.id);
//   if (!followers)
//     res.status(500).send({
//       status: "error",
//       data: { message: `cant find followers for user ${user.id}` },
//     });
//   res.send({ status: "success", data: { followers } });
// });

module.exports = router;
