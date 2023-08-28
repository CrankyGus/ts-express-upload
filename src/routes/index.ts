import express from "express";
import { log } from "../middlewares/logger";
import { router as imagesRouter } from "./images";

export const router = express.Router();

router.use(imagesRouter);

router.use((req, res) => {
  res.status(404).send("Sorry, the requested page doesn't exist!");
  log.error(`${req.method} ${req.path} ${res.statusCode}`);
});
