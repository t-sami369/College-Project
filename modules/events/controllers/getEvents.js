const getEvent = (req,res)=>{
    res.status(200).json({
      status:"Here is the list of events."
    })
 };
 module.exports=getEvent;