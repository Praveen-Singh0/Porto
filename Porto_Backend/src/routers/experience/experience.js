import express from "express";
import { validate } from "../../middlewares/validate.js";
import { experienceSectionSchema } from "../../validators/experience.schema.js";
import { createExperience, getExperienceSection, updateExperienceSection, deleteExperienceSection } from "../../controllers/experience/experience.controller.js";

const router = express.Router();

router.post("/create", validate(experienceSectionSchema), createExperience);
router.get("/get", getExperienceSection);
router.put("/:id", validate(experienceSectionSchema), updateExperienceSection);
router.delete("/:id", deleteExperienceSection);

export default router;



