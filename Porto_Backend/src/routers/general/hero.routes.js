import express from "express";
import { validate } from "../../middlewares/validate.js";

import { heroSectionSchema } from "../../validators/heroSection.schema.js";
import { createHero, getHeroSection } from "../../controllers/general/heroSection.controller.js";
const router = express.Router();

router.post("/create", validate(heroSectionSchema), createHero);
router.get("/get", getHeroSection);
// router.delete("/:id", deleteInfo);
// router.put("/:id", validate(heroSectionUpdateSchema), updateInfo);

export default router;  
