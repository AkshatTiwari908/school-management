import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"
import schoolRoute from "./routes/school-route.js"
const server = express()
const port = process.env.PORT||3000
dotenv.config()
server.use(express.json())
server.use('/v1',schoolRoute)
server.listen(port,()=>{
     console.log(`Server Listening to port ${port}`)
     connectDB();
})