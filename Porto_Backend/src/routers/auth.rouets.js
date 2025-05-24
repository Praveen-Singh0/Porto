import { Router } from "express";
const router = Router();

import { createUser, LoginUser, logoutUser, refreshAccessToken, } from "../controllers/auth.controllers.js";
router.route('/register').post(createUser);
router.route('/login').post(LoginUser);
router.route('/logout').post(logoutUser);
router.route('/refresh').get(refreshAccessToken);


export default router; 