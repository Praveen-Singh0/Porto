import mongoose from "mongoose";
const connectDataBase = async ()=>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}`);
    console.log(`\n MongoDB connected : , ${connectionInstance.connection.host}`)
    
  } catch (error) {
    console.log("error while connecting the DB", error)
    process.exit(1); // not zero code(1,2,3,..) means error
    
  }
}
export default connectDataBase;