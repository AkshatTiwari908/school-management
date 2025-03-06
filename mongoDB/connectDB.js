import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config('./.env');
const connectDB = async()=>{
   try{ if(!process.env.MONGO_URI){
        return console.log("Data Base URL not found!");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.error(error);
    }
}
export default connectDB

