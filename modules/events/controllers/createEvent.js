const createEvent = (req,res)=>{
   res.status(200).json({
     status:"Event created."
   })
};
module.exports=createEvent;