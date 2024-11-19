const mongoose=require("mongoose");

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
    res.status(200).json({
     status:"User successfully logged in."
    })
 }
 module.exports=userLogin;