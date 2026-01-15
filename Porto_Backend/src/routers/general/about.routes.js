import express from "express";
import { upload, handleMulterError } from "../../middlewares/upload.js";
import {
  createAbout,
  getAboutSection,
} from "../../controllers/general/aboutSection.controller.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  handleMulterError,
  createAbout
);

router.get("/get", getAboutSection);

export default router;
