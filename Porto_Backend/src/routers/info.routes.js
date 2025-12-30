import express from "express";
import { validate } from "../middlewares/validate.js";
import { portfolioInfoSchema, updatePortfolioInfoSchema } from "../validators/portfolioInfo.schema.js";
import { createInfo, deleteInfo, getInfo, updateInfo } from "../controllers/info.controllers.js";
const router = express.Router();

router.post("/create", validate(portfolioInfoSchema), createInfo);
router.get("/get", getInfo);
router.delete("/:id", deleteInfo);
router.put("/:id", validate(updatePortfolioInfoSchema), updateInfo);

export default router;  
