const db = require("../models/index");

class tripServices{
    createTrip= async ({startDate, endDate, user_id}, transaction)=>{
        const trip= await db.Trip.create({startDate, endDate, user_id: user_id}, {transaction});
        return trip;
    }
};

module.exports= new tripServices();