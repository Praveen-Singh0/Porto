import { app } from "./app.js";
import dotenv from "dotenv"
import connectDataBase from './DB/index.js'

connectDataBase().then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`app run in port ${process.env.PORT}`)
  })
}).catch(()=>{
  console.log("DB Connection faild !!!");
})
