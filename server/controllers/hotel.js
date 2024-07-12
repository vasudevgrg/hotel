const { defaults } = require("pg");
const db = require("../models/index");
const fileUploadServices = require("../services/file-upload");
const hotelServices = require("../services/hotel");
const locationServices = require("../services/location");
const roomServices = require("../services/room");
const amenityServices = require("../services/amenity");
const roomDateServices = require("../services/room_date");
const { Op } = require('sequelize'); 
require("dotenv").config();

const createhotel = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    console.log(process.env.API_SECRET);
    const {
      name,
      hotel_pic,
      location,
      rooms,
      smallRoomPrice,
      largeRoomPrice,
      amenities,
    } = req.body;

    const loc = await locationServices.findOrCreateLocation(location, t);

    const hotel = await db.Hotel.create(
      {
        name: name,
        location_id: loc[0].id,
        hotel_pic: hotel_pic,
        user_id: req.cookies.user_id,
      },
      { transaction: t }
    );

    for (const room of rooms) {
      if (room.size == "small") {
        await roomServices.createRoom(
          {
            room_no: room.room_no,
            size: room.size,
            vacancy: true,
            price: smallRoomPrice,
            hotel_id: hotel.id,
          },
          t
        );
      } else {
        await roomServices.createRoom(
          {
            room_no: room.room_no,
            size: room.size,
            vacancy: true,
            price: largeRoomPrice,
            hotel_id: hotel.id,
          },
          t
        );
      }
    }

    //   if (Array.isArray(amenities)) {
    //     for (const amenityName of amenities) {
    //       const [amenity] = await amenityServices.createOrFindAmenity(amenityName,t );
    //       await hotel.addAmenity(amenity, t );
    //     }
    //   } else {
    //     const amenity = await db.Amenity.create({ name: amenities }, t );
    //     await hotel.addAmenity(amenity,t );
    //   }

    await t.commit();
    res.send({ message: "Hotel is Registered" });
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

const signedUrl = async (req, res) => {
  try {
    const obj = await fileUploadServices.createImageUpload();
    console.log(obj);
    res.send({ signedUrl: obj });
  } catch (err) {
    console.log(err);
  }
};

const getHotels = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const price = req.query.price;
  const { location, large, small } = req.body;

  try {
    const rawHotels = await hotelServices.getHotels({ location });

    const finalHotels = await Promise.all(
      rawHotels.map(async (hotel) => {
        const isRoomAvailable = await hotelServices.filterRooms({
          hotel_id: hotel.id,
          largeRooms: large,
          smallRooms: small,
          price: price,
        });
        if (isRoomAvailable.check && price >= isRoomAvailable.price) {
          return hotel;
        }
      })
    );

    const filteredHotels = finalHotels.filter((hotel) => hotel !== undefined);

    const startIdx = (pageNumber - 1) * pageSize;
    const endIdx = Math.min(pageNumber * pageSize, filteredHotels.length);
    const paginatedHotels = filteredHotels.slice(startIdx, endIdx);

    res.send({
      hotels: paginatedHotels,
      totalPages: Math.ceil(filteredHotels.length / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching hotels." });
  }
};

const handleCitySuggestion = async (req, res) => {
  const cityname = req.query.cityName;

  try {
    // const cities = await db.Hotel.findAll({
    //   where: {
    //     location: {
    //       [Op.like]: `%${cityname}%`,
    //     },
    //   },
    //   limit: 5,
    // });

    const cities= await db.Location.findAll({
        where:{
            name:{
                [Op.like]: `%${cityname}%`,
            }
        }
    })

    res.send({ cities: cities });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const allHotels = async (req, res) => {
  const user_id = req.cookies.user_id;

  try {
    const hotels = await db.Hotel.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: db.Room,
      },
    });
    console.log(hotels);
    res.status(200).json({ hotels: hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const bookHotel = async (req, res) => {
  console.log(req.body+" "+"inside bookhotel" );
  let { hotel_id, startDate, endDate, large, small } = req.body;
  console.log(hotel_id)
  const t = await db.sequelize.transaction();
  try {
   

    const LargeRooms = await roomServices.findRooms({ size: "large", hotel_id:hotel_id });

    for (let e of LargeRooms) {
      const allDates = await roomDateServices.findDates({ room_id: e.id }, t);

      if (hotelServices.RoomFilter(allDates, { startDate, endDate })) {
        await roomDateServices.createDate(
          { startDate, endDate, room_id: e.id, user_id: req.cookies.user_id },
          t
        );
        large--;
      }
    }

    const smallRooms = await roomServices.findRooms({ size: "small", hotel_id:hotel_id});

    for (let e of smallRooms) {
      const allDates = await roomDateServices.findDates({ room_id: e.id }, t);

      if (hotelServices.RoomFilter(allDates, { startDate, endDate })) {
        await roomDateServices.createDate(
          { startDate, endDate, room_id: e.id , user_id: req.cookies.user_id},
          t
        );

        small--;
      }
    }

    if (large !== 0 || small !== 0) {
      await t.rollback();
      res
        .status(400)
        .json({
          message:
            "Unable to book hotel due to room unavailability on that day",
        });
    } else {
      await t.commit();
      res.status(200).json({ message: "Hotel is Booked" });
    }
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHotel = async (req, res) => {
  console.log("inside get hotel");
  const hotel_id = req.params.id;
  const hotel = await db.Hotel.findOne({
    where: {
      id: hotel_id,
    },
    include: {
      model: db.Room,
    },
  });

  res.send({ hotel: hotel });
};

const availableRooms = async (req, res) => {
    const { startDate, endDate, hotel_id } = req.body;
  
    try {
      const rooms = await db.Room.findAll({
        where: {
          hotel_id: hotel_id,
        },
      });
  
      let finalRooms = [];
  
      for (let e of rooms) {
        const prevDates = await db.Room_Date.findAll({
          where: {
            room_id: e.id,
          },
        });
  
        let val = await hotelServices.RoomFilter(prevDates, { startDate, endDate });
        console.log(val);
  
        if (val) {
          finalRooms.push(e);
        }
      }
  
      res.send({ rooms: finalRooms });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

const addRating = async (req, res) => {
  const { hotel_id, rating, comment } = req.body;
  const review = await db.Rating.create({
    hotel_id,
    rating,
    comment,
    user_id: req.cookies.user_id,
  });
  res.send({ message: "Review Added" });
};



module.exports = {
  createhotel,
  signedUrl,
  getHotels,
  handleCitySuggestion,
  allHotels,
  bookHotel,
  availableRooms,
  getHotel,
  addRating,
};
