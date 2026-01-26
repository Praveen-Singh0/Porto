import express from "express";
import { upload, handleMulterError } from "../../middlewares/upload.js";
import {
  createAbout,
  getAboutSection,
} from "../../controllers/general/aboutSection.controller.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "image", },
    { name: "document",  }
  ]),
  handleMulterError,
  createAbout
);

router.get("/", getAboutSection);

export default router;
