import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import infoRouters from './routers/info.routes.js';
import heroRouters from './routers/general/hero.routes.js';
import aboutRouters from './routers/general/about.routes.js';
import experienceRouters from './routers/experience/experience.js';
import educationRouters from './routers/general/education.routes.js';
import skillsRouters from './routers/general/skills.routes.js';
import authRouters from './routers/auth/auth.routes.js';
import majorProjectsRoutes from './routers/projects/majorProject.routes.js'
import minorProjectsRoutes from './routers/projects/minorProject.routes.js'
import uploadRoutes from "./routers/upload/upload.routes.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api/info", infoRouters);
app.use("/api/hero", heroRouters);
app.use("/api/about", aboutRouters);
app.use("/api/experience", experienceRouters);
app.use("/api/education", educationRouters);
app.use("/api/skills", skillsRouters);
app.use("/api/auth", authRouters);
app.use("/api/majorProjects", majorProjectsRoutes);
app.use("/api/minorProjects", minorProjectsRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);
export { app };
