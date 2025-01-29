const Event=require("../../../models/events.model");
const { sendNewEventNotification } = require('../../../utilities/notificationService');

const createEvent =async(req,res)=>{
  
  const {title, description,date}=req.body;
  try{
    const newEvent= await Event.create({
      title,
      description,
      date,
      organizer:req.user.id
    });

    // Send notification for new event
    await sendNewEventNotification(newEvent);
  
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