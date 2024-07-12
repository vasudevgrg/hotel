
const db = require("../models/index");

const roomSchedule= async (req, res)=>{
    const room_id= req.params.room_id;
    console.log("insiode roomschedule");
    console.log(room_id);
    if(!room_id){
        res.send({message:"Room doesnt exist"});
    }
    const dates= await db.Room_Date.findAll({
        where:{
            room_id:room_id
        }
    });
console.log(dates);
    res.send({dates: dates});
};

const updateSchedule= async (req, res)=>{
    const schedule_id= req.params.schedule_id;
    const {startDate, endDate}= req.body;
    try{
    const schedule= await db.Room_Date.update(
        {startDate: startDate, endDate:endDate},{
        where:{
            id: schedule_id
        }
    });
    res.send({message:"Schedule updated"});
}catch(err){
    res.send({message:err});
}
};

const deleteSchedule= async (req, res)=>{
    const schedule_id=req.params.schedule_id;
    try{
        await db.Room_Date.destroy({
            where:{
                id: schedule_id
            }
        });
        res.send({message:"Schedule Deleted"})
    }catch(err){
        res.send({message:"Error in deleting Schedule"})
    }

}

module.exports= {roomSchedule, updateSchedule, deleteSchedule};