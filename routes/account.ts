import express from "express";
const router = express.Router();
import validate from "../middleware/validate";

//controllers
import { getAccountController } from "../controllers/account.controller";

router.use(validate);

router.get("/", getAccountController);

module.exports = router;
