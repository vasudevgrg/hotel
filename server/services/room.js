const db = require("../models/index");

class RoomServices {
  createRoom = async ({ room_no, size, vacancy, price, hotel_id }, transaction) => {
    const room = await db.Room.create(
      { room_no, size, vacancy, price, hotel_id },
      { transaction }
    );
    return room;
  };

  findRooms= async ({hotel_id,size})=>{
    const rooms= await db.Room.findAll({
      where:{
          hotel_id:hotel_id,
          vacancy:true,
          size:size
      }
  });
  return rooms;
  }
}

module.exports = new RoomServices();
