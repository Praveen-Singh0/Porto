import express from "express";
import { validate } from "../../middlewares/validate.js";
import { upload, handleMulterError } from "../../middlewares/upload.js";
import {
  createMajorProjectSchema,
  updateMajorProjectSchema,
} from "../../validators/majorProject.schema.js";
import {
  createMajorProject,
  getAllMajorProjects,
  updateMajorProject,
  deleteMajorProject,
} from "../../controllers/projects/majorProject.controllers.js";

const router = express.Router();

// ✅ CORRECT ORDER: Multer → Error Handler → Validation → Controller
router.post(
  "/create",
  upload.single("image"),
  handleMulterError,
  validate(createMajorProjectSchema),
  createMajorProject
);

router.get("/", getAllMajorProjects);

router.put(
  "/:id",
  upload.single("image"),
  handleMulterError,
  validate(updateMajorProjectSchema),
  updateMajorProject
);

router.delete("/:id", deleteMajorProject);

export default router;
