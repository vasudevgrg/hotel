const { where } = require("sequelize");
const db= require("../models/index");
const locationServices= require("../services/location");
const tripServices= require("../services/trip");

const createTrip = async (req, res) => {
    let { location, hotel_id, startDate, endDate } = req.body;
  
   
    const t = await db.sequelize.transaction();
  
    try {

      const loc = await locationServices.findLocation(location, t);
      const hotel = await db.Hotel.findOne({
        where: {
          id: hotel_id
        },
        transaction: t
      });
  
      const trip = await tripServices.createTrip({
        startDate: startDate,
        endDate: endDate,
        user_id: req.cookies.user_id
      }, t);
  
      await loc.addTrip(trip, { transaction: t });
      await hotel.addTrip(trip, { transaction: t });
 
      await t.commit();
  
      res.send({ message: "Trip is Registered" });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).send({ error: "An error occurred while creating the trip" });
    }
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