import mongoose from "mongoose";

const connectDB = async() => {
try{
  await mongoose.connect(`${process.env.MONGO_URI}/note-app` )
  console.log("mongodb connected succesfully ");
  
} catch (error){
    console.log("mongodb connection error",error)   ;
    
}
}

export default connectDB;