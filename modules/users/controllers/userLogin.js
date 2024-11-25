const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userLogin=async(req,res)=>{
    const Users=mongoose.model("users");
    const [email,password] = req.body;

     try{
       if(!email) throw "Email must be provided.";
       if(!password) throw "Password must be provided.";
       const getUser= await Users.findOne({
        email:email
       });
       if(!getUser) throw "This email doesn't exist."
       const matched= await bcrypt.compare(password,getUser.password);
       if(!matched) throw "Email and password doesn't match."
     }catch(e){
        res.status(400).json({
            status:"failed",
            error:e
        });
        return;
     }
     const getUserForAccessToken= await Users.findOne({
      email:email
     });
     const accessToken= jwt.sign({
      id:getUserForAccessToken._id,
      email:getUserForAccessToken.email,
      name:getUserForAccessToken.name
     },process.env.jwt_salt,
     {
      expiresIn:"90 days"
     });
    res.status(200).json({
     status:"User successfully logged in."
    })
 }
 module.exports=userLogin;