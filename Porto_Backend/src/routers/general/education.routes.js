import express from "express";
import { upload, handleMulterError } from "../../middlewares/upload.js";
import { validate } from "../../middlewares/validate.js";
import {
  createEducation,
  getEducationSection,
  deleteEducationSection,
  updateEducationSection,
} from "../../controllers/general/education.controller.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("collageImage"),   // 👈 ADD
  handleMulterError,
  createEducation
);

router.patch(
  "/:id",
  upload.single("collageImage"),   // 👈 ADD
  handleMulterError,
  updateEducationSection
);

router.get("/", getEducationSection);
router.delete("/:id", deleteEducationSection);

export default router;
