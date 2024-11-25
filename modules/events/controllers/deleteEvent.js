const deleteEvent = (req,res)=>{
    res.status(200).json({
      status:"Event deleted."
    })
 };
 module.exports=deleteEvent;