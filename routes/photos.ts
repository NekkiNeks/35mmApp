import express from "express";
const router = express.Router();

//controllers
import {
  deletePhotoController,
  getAllPhotosController,
  uploadPhotoController,
} from "../controllers/photos.controller";

//middleware
import validate from "../middleware/validate";
import { uploadSingle } from "../middleware/upload";

router.use(validate);

//routes
router.get("/", getAllPhotosController);
router.post("/upload", uploadSingle, uploadPhotoController);
router.delete("/:id", deletePhotoController);

module.exports = router;
