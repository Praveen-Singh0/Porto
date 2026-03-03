import express from "express";
import passport from "passport";
import "../../utils/googleAuth.js";
import { googleCallback } from "../../controllers/auth/google.controller.js";

const router = express.Router();

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.ORIGIN + "/error/googleAuth",
  }),
  googleCallback
);

export default router;