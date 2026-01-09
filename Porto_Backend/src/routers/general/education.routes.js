import express from "express";
import { validate } from "../../middlewares/validate.js";
import { createEducation, getEducationSection, deleteEducationSection, updateEducationSection } from "../../controllers/general/education.controller.js";
import { educationSectionSchema, educationSectionUpdateSchema } from "../../validators/education.schema.js";

const router = express.Router();

router.post("/create", validate(educationSectionSchema), createEducation);
router.get("/get", getEducationSection);
router.delete("/:id", deleteEducationSection);
router.patch("/:id", validate(educationSectionUpdateSchema), updateEducationSection);

export default router;  
