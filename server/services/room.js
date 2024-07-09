const db = require("../models/index");

class RoomServices {
  createRoom = async ({ room_no, size, vacancy, price, hotel_id }, transaction) => {
    const room = await db.Room.create(
      { room_no, size, vacancy, price, hotel_id },
      { transaction } // Pass the transaction object
    );
    return room;
  };
}

module.exports = new RoomServices();
