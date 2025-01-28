const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userRegister=async(req,res)=>{
   const Users=mongoose.model("users");
   const {name,email,password,contact,dateOfBirth,role} = req.body;
   //logic for data creation
   const encPassword=await bcrypt.hash(password,10);
   try{
     const newUser=await Users.create({
      name,
      email, 
      password: encPassword,
      contact,
      dateOfBirth,
      role
     });
   }catch(e){
     res.status(400).json({
      status:"failed",
      error:e.message
     });
     return;
   }
   res.status(200).json({
    status:"User registration successful."
   })
}
module.exports=userRegister;