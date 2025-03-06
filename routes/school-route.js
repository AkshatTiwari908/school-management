import express from "express"
import School from "../models/school-model.js"
import {calDistance} from "../controllers/route-controller.js"
const router = express.Router()
router.post('/addSchool',async(req,res)=>{
         try{
            const {name,address,latitude,longitude}=req.body
            if(!name ||!address||!latitude||!longitude){
                return res.status(400).json({error:"All Fields are required"})
            }
            const newSchool= new School({name,address,latitude,longitude})
            await newSchool.save()
            res.status(201).json({message:"New school added successfully",school: newSchool})
         }catch(error){
            res.status(500).json({ error: "Server error", details: error.message })
         }
})
router.get('/listSchools',async(req,res)=>{
       try{
          const{latitude,longitude}=req.query
          if(!latitude||!longitude){
            return res.status(400).json({error:"Latitude and Longitude are required"});
          }
        const schools= await School.find({})
        const sortedSchools = schools.map(school => {
            let schoolObj = school.toObject() // Convert to Plain Obj
            schoolObj.distance = calDistance(latitude, longitude, school.latitude, school.longitude)
            return schoolObj;
        }).sort((a, b) => a.distance - b.distance)
        return res.json(sortedSchools)
       }catch(error){
        res.status(500).json({ error: "Server Error", details: error.message })
       }
})
export default router