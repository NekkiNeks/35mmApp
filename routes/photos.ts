import express from "express";
const router = express.Router();

//middleware
import validate from "../middleware/validate";
import { uploadSingle } from "../middleware/upload";

//functions
import { addPhoto, deletePhoto, getAllPhotos } from "../libs/tools";

router.use(validate);

router.get("/", async (req, res) => {
  const photos = await getAllPhotos();
  res.send({ status: "success", data: { photos } });
});

router.post("/upload", uploadSingle, async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    if (req.file && req.file.filename) {
      await addPhoto(userId, {
        camera: req.body.camera,
        film: req.body.film,
        name: req.file.filename,
      });
      res.send({
        status: "success",
        data: {
          message: `photo ${req.file.originalname} was uploaded`,
        },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({
        status: "error",
        data: { message: err.message },
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const responce = await deletePhoto(req.params.id);
    console.log(responce);
    res.send({
      status: "success",
      data: { message: `photo ${req.params.id} was deleted` },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({
        status: "error",
        data: { message: err.message },
      });
    }
  }
});

module.exports = router;
