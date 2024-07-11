// repositories/hotelRepository.js

const db = require("../models/index");

class HotelRepository {
  async findRoomsByHotelId(hotel_id) {
    return  db.Room.findAll({
      where: { hotel_id },
    });
  }

  async findHotelsByLocation(location) {
    return db.Hotel.findAll({
      include: [
        {
          model: db.Location,
          where: { name: location },
        },
        {
          model: db.Room,
        },
        {
          model: db.Amenity,
        },
      ],
    });
  }
}

module.exports = new HotelRepository();
