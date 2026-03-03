import { generateToken } from "./auth.controller.js";
import { prisma } from "../../../lib/prisma.js";

export const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = generateToken(user);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(process.env.ORIGIN + "/admin-dashboard");
  } catch (error) {
    return res.redirect(process.env.ORIGIN + "/error/googleAuth");
  }
};
