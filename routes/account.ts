import express from "express";
const router = express.Router();
import validate from "../middleware/validate";

// functions
import { getUser } from "../tools";

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

module.exports = router;
