import { app } from "./app.js";
import dotenv from "dotenv"
import connectDataBase from './DB/index.js'

connectDataBase().then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`running on port : ${process.env.PORT}`)
  })
}).catch(()=>{
  console.log("DB Connection faild !!!");
})
