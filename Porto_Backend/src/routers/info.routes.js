import express from "express";
import { upload, handleMulterError } from "../middlewares/upload.js";
import {
  createOrUpdateInfo,
  getInfo,
} from "../controllers/info.controllers.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("profileImage"),
  handleMulterError,
  createOrUpdateInfo
);

router.get("/get", getInfo);

export default router;
