import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import { connectDB } from "../lib/prisma.js";
import infoRouters from './routers/info.routes.js';
import heroRouters from './routers/general/hero.routes.js';
import aboutRouters from './routers/general/about.routes.js';


dotenv.config();

const app = express();

await connectDB();

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

app.use(errorHandler);
export { app };
