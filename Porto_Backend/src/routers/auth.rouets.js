import { Router } from "express";
const router = Router();

import { createUser, LoginUser} from "../controllers/auth.controllers.js";
router.route('/create-user').post(createUser);
router.route('/Login').post(LoginUser);

export default router;