import express from "express";
const router = express.Router();
import validate from "../middleware/validate";

//functions
import { getUser } from "../libs/tools";

router.use(validate);

router.get("/:login", async (req, res) => {
  const login = req.params.login;
  try {
    const user = await getUser(login, { noPassword: true });
    res.send({
      status: "success",
      data: { user: user },
    });
  } catch (err) {}
});

module.exports = router;
