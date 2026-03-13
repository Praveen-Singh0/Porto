import express from "express";
import session from "express-session";
import passport from "passport";
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
import googleRoutes from "./routers/auth/google.route.js";
import githubRoutes from "./routers/github.routes.js";



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



app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/auth", googleRoutes);
app.use("/api/majorProjects", majorProjectsRoutes);
app.use("/api/minorProjects", minorProjectsRoutes);
app.use("/api/github", githubRoutes);

app.use(errorHandler);
export { app };
