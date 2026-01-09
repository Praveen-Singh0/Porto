import express from "express";
import { upload, handleMulterError } from "../../middlewares/upload.js";
import { uploadSingleImage } from "../../controllers/upload.controllers.js";

const router = express.Router();

router.post(
  "/image",
  upload.single("image"),
  handleMulterError,
  uploadSingleImage
);

export default router;
