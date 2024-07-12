const db= require("../models/index");

class roomDateServices{
    findDates=async ({room_id}, transaction)=>{
        const allDates = await db.Room_Date.findAll({
            where: {
                room_id: room_id
            },
            transaction
        });
        return allDates
    }

    createDate= async ({startDate, endDate, room_id, user_id}, transaction)=>{
       const date= await db.Room_Date.create({
            startDate,
            endDate,
            room_id,
            user_id
        },transaction);

        return date;
    }
};

module.exports= new roomDateServices();