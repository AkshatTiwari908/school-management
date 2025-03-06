import mongoose, { version } from "mongoose"
const schoolSchema= new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    latitude:{type:Number,required:true},
    longitude:{type:Number,required:true}},
    {versionKey:false}
)
export default mongoose.model('School',schoolSchema);