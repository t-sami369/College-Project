const adminDashboard=(req,res)=>{
   res.status(200).json({
    status:"Welcome to adminDashboard"
   });
};
module.exports=adminDashboard;