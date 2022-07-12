import express from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    const name =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

export function uploadSingle(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const upload = multer({
    storage,
    limits: { fileSize: 10 },
  }).single("myPhoto");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).send({ status: "error", data: { message: err.message } });
    } else if (err) {
      res.status(500).send({
        status: "error",
        data: { message: "something went wrong with upload" },
      });
    }
    next();
  });
}
