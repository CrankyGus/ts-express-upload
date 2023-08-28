import logger from "pino";
import express from "express";

export const log = logger({
  transport: {
    target: "pino-pretty",
  },
});

export default function loggerMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (res.statusCode >= 400) log.error(res.statusCode, req.url);
  else log.info(`${req.method} ${req.path} ${res.statusCode}`);
  next();
}
