"use client"
import { useState, useEffect } from "react"
const about = ()=>{
  const [name, setName] = useState(null);

  useEffect(() => {
    setName("rahul")
  }, []) 


  return (
    <h1>About section {name}</h1>
  )
}
export default about 