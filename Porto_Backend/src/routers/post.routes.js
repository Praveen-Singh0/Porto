import express from "express";
import { createPosts, deletePosts, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", createPosts);
router.get("/get", getPosts);
router.delete("/:id", deletePosts)

export default router;
