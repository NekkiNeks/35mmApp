import express from "express";

export function handleError(err: any, res: express.Response) {
  if (err instanceof Error) {
    res.send({ status: "error", data: { message: err.message } });
  } else {
    res
      .status(500)
      .send({ status: "error", data: { message: "unknown server error" } });
  }
}
