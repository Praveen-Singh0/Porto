import { Router } from "express";
import { createSkills, getSkills, deleteSkills } from "../controllers/skills.controller.js";
const router = Router();

router.route('/skill/create').post(createSkills)
router.route('/skill/get').get(getSkills)
router.route('/skill/delete/:id').delete(deleteSkills)

export default router;