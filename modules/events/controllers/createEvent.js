const Event=require("../../../models/events.model");

const createEvent =async(req,res)=>{
  
  const {title, description,date}=req.body;
  try{
    const newEvent= await Event.create({
      title,
      description,
      date,
      organizer:req.user.id
    });
    res.status(200).json({
      status:"success",
      message:"Event created successfully!",
      event:newEvent
    });
  }catch(e){
    res.status(400).json({
      status:"failed",
      error:e.message
    });
    return;
  }
  
   
};
module.exports=createEvent;