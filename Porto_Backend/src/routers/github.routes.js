import express from "express";
import { getGithubOverview } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/overview", getGithubOverview);

export default router;