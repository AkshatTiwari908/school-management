import express from "express"
import School from "../models/school-model.js"
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
        
          const calDistance = (lat1, lon1, lat2, lon2) => {
            const toRad = (angle) => (angle * Math.PI) / 180
            const R = 6371 
        
            const dLat = toRad(lat2 - lat1)
            const dLon = toRad(lon2 - lon1)
        
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
        
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            return R * c; 
        };
        
        console.log(calDistance(28.7041, 77.1025, 34.0522, -118.2437))
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