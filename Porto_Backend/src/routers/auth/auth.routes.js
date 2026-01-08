import express from "express";
import { validate } from "../../middlewares/validate.js";
import { signupSchema, loginSchema } from "../../validators/user.schema.js";
import { signup, login, logout, getUser, verifyJWT, isAdmin, deleteUser, verify_Its_Me} from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout)
router.get("/me", verify_Its_Me)
router.get("/getUsers", getUser)
router.delete("/:id", deleteUser)


// router.delete("/:id", verifyJWT, isAdmin, deleteUser)
// router.get("/getUsers", verifyJWT, isAdmin,  getUser)


export default router;