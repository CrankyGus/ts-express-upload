import express from "express";
import multer from "multer";
import fs from "fs";
import loggerMiddleware, { log } from "../middlewares/logger";

const path = __dirname.split("\\").slice(0, -2).join("\\") + "/public/images";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg")
      cb(null, true);

    cb(null, false);
  },
});

export const router = express.Router();

router.use(loggerMiddleware);

router.get("/images/:name", (req, res) => {
  res.sendFile(path + "/" + req.params.name);
});

router.get("/images", (req, res) => {
  fs.readdir(path, (err, files) => {
    if (err) {
      log.error(`${req.method} ${req.path} 400`);
      res.status(400).json("Error reading files");
      return;
    }

    const images = files.map((file) => {
      return {
        name: file,
        url: `${process.env.SERVER_HOST}/images/${file}`,
      };
    });
    res.status(200).json(images);
  });
});

router.post("/upload/images", upload.single("image"), (req, res) => {
  const fileName = req.file?.filename;
  const fileType = req.file?.mimetype;
  if (fileType !== "image/png" && fileType !== "image/jpeg") {
    log.error(`${req.method} ${req.path} 400`);
    res.status(400).json("File type not supported");
    return;
  }
  return res.status(201).json(fileName);
});

router.delete("/images/:name", (req, res) => {
  const fileName = req.params.name;
  fs.unlink(path + "/" + fileName, (err: any) => {
    if (err) {
      log.error(`${req.method} ${req.path} 400`);
      res.status(400).json("File not found");
      return;
    }
    res.status(200).json("File deleted");
  });
});
