import express from "express";
import { validate } from "../../middlewares/validate.js";
import { skillSectionSchema } from "../../validators/skillSection.schema.js";
import { createSkillsSection, getSkillsSection, deleteSkillsSection } from "../../controllers/general/skills.controller.js";

const router = express.Router();

router.post("/create", validate(skillSectionSchema), createSkillsSection);
router.get("/get", getSkillsSection);
router.delete("/:id", deleteSkillsSection);

export default router;  
