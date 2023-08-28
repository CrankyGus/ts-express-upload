import express from "express";
import loggerMiddleware from "../middlewares/logger";

export const router = express.Router();

router.use(loggerMiddleware, (req, res) => {
  res.status(404).send("Sorry, the requested page doesn't exist!");
});
