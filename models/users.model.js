const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required!"]
  },
  email:{
    type:String,
    required:[true,"Email is required!"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"Password is required!"]
  },
  contact:{
    type:String,
    required:[true,"Phone number is required!"]
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
 }
},
{
  timestamps:true
});

const userModel = mongoose.model("users",userSchema);
module.exports=userModel;