import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT"], // ADD DELETE METHOD 
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

import skillRouter from './routers/skills.route.js'

app.get('/', (req, res) => {
  res.send("HELLO")
})

app.use("/api", skillRouter)
// http//:localhost:3000/api/skill/create


export { app }