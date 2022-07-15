import express from "express";

//functions
import { addPhoto, deletePhoto, getAllPhotos } from "../libs/tools/photo.tools";
import { handleError } from "../libs/tools/tools";

export async function uploadPhotoController(
  req: express.Request,
  res: express.Response
) {
  try {
    const userId = res.locals.user.userId;
    if (!req.file) throw new Error("no file was provided");
    await addPhoto(userId, {
      camera: req.body.camera || "",
      film: req.body.film || "",
      name: req.file.filename,
    });
    res.send({
      status: "success",
      data: {
        message: `photo ${req.file.originalname} was uploaded`,
      },
    });
  } catch (err) {
    handleError(err, res);
  }
}

export async function deletePhotoController(
  req: express.Request,
  res: express.Response
) {
  try {
    const responce = await deletePhoto(req.params.id);
    console.log(responce);
    res.send({
      status: "success",
      data: { message: `photo ${req.params.id} was deleted` },
    });
  } catch (err) {
    handleError(err, res);
  }
}

export async function getAllPhotosController(
  req: express.Request,
  res: express.Response
) {
  try {
    const photos = await getAllPhotos();
    res.send({ status: "success", data: { photos } });
  } catch (err) {
    handleError(err, res);
  }
}
