
const hotelRepositories = require("../repositories/hotelRepositories");

class HotelServices {
  async filterRooms({ hotel_id, largeRooms, smallRooms, price }) {
    console.log(price + " hotel id");
    const rooms = await hotelRepositories.findRoomsByHotelId(hotel_id);
    
    let large = 0;
    let small = 0;
    let cost = Number.MAX_SAFE_INTEGER;

    rooms.forEach((e) => {
      cost = Math.min(cost, e.price);
      if (e.vacancy) {
        if (e.size === "large") {
          large++;
        } else {
          small++;
        }
      }
    });

    const check = large >= largeRooms && small >= smallRooms;
    console.log(check + " " + cost);
    return { check, price: cost };
  }

  RoomFilter(arr, obj) {
    // console.log(arr);
    // console.log(obj);

    if (arr.length === 0) {
      return true;
    }
    const objStartDate = new Date(obj.startDate);
    const objEndDate = new Date(obj.endDate);

    if (new Date(arr[0].startDate) >= objEndDate) {
      return true;
    }

    for (let i = 0; i < arr.length - 1; i++) {
      const currentEndDate = new Date(arr[i].endDate);
      const nextStartDate = new Date(arr[i + 1].startDate);

      console.log(currentEndDate);
      console.log(objStartDate);
      if (currentEndDate <= objStartDate && nextStartDate >= objEndDate) {
        return true;
      }
    }

    if (new Date(arr[arr.length - 1].endDate) <= objStartDate) {
      return true;
    }

    return false;
  }

  async getHotels({ location }) {
    return hotelRepositories.findHotelsByLocation(location);
  }
}

module.exports = new HotelServices();
