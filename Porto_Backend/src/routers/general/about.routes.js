import express from "express";
import { validate } from "../../middlewares/validate.js";
import { aboutSectionSchema } from "../../validators/aboutSection.schema.js";
import { createAbout, getAboutSection } from "../../controllers/general/aboutSection.controller.js";
const router = express.Router();

router.post("/create", validate(aboutSectionSchema), createAbout);
router.get("/get", getAboutSection);

export default router;  
