const { where } = require("sequelize");
const db= require("../models/index");

const createTrip=async (req, res)=>{
    let {location, hotel_id, startDate, endDate}= req.body;
  

    const loc= await db.Location.findOne({
        where:{
            name:location
        }
    });

    const hotel= await db.Hotel.findOne({
        where:{
            id:hotel_id
        }
    });

    const trip= await db.Trip.create({startDate:startDate, endDate:endDate, user_id: req.cookies.user_id});
    await loc.addTrip(trip);
    await hotel.addTrip(trip);

res.send({message:"Trip is Regristered"});
};

const allTrips= async (req, res)=>{
    const trips= await db.Trip.findAll({
        where:{
            user_id: req.cookies.user_id
        },
        include:[{
            model: db.Location
        },{
            model: db.Hotel
        }]
    });

res.send({trips: trips})
}

module.exports={createTrip, allTrips}