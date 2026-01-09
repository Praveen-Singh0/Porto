import express from "express";
import { validate } from "../../middlewares/validate.js";
import { upload, handleMulterError } from "../../middlewares/upload.js";
import {
  minorProjectSchema,
  updateMinorProjectSchema,
} from "../../validators/minorProject.schema.js";
import {
  createMinorProject,
  getAllMinorProjects,
  updateMinorProject,
  deleteMinorProject,
} from "../../controllers/projects/minorProject.controllers.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  handleMulterError,
  validate(minorProjectSchema),
  createMinorProject
);

router.get("/", getAllMinorProjects);

router.put(
  "/:id",
  upload.single("image"),
  handleMulterError,
  validate(updateMinorProjectSchema),
  updateMinorProject
);

router.delete("/:id", deleteMinorProject);

export default router;
