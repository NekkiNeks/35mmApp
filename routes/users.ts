import express from "express";
const router = express.Router();
import validate from "../middleware/validate";

//controllers
import { getUsersController } from "../controllers/users.controller";

router.use(validate);

router.get("/:login", getUsersController);

module.exports = router;
