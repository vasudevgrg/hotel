const db= require("../models/index")
class hotelServices{
    filterRooms=async ({hotel_id, largeRooms, smallRooms})=>{
        console.log(hotel_id+ " hotel id");
        const rooms= await db.Room.findAll({
            where:{
                hotel_id: hotel_id
            }
        });
        let large=0;
        let small=0;

       await rooms.map(e=>{
            if(e.vacancy==true){
                if(e.size=="large"){
                    large++;
                }else{
                    small++;
                }
            }
        });
// console.log(large+" "+small);
        return large>=largeRooms && small>=smallRooms;
    }

     RoomFilter = (arr, obj) => {
        console.log(arr);
        console.log(obj);
      
        // If the array is empty, the room is available
        if (arr.length === 0) {
          return true;
        }
      
        // Convert startDate and endDate of obj to Date objects
        const objStartDate = new Date(obj.startDate);
        const objEndDate = new Date(obj.endDate);
      
        // Check if the room is available before the first booking
        if (new Date(arr[0].startDate) >= objEndDate) {
          return true;
        }
      
        // Loop through the bookings to find an available slot
        for (let i = 0; i < arr.length - 1; i++) {
          const currentEndDate = new Date(arr[i].endDate);
          const nextStartDate = new Date(arr[i + 1].startDate);
      
          if (currentEndDate <= objStartDate && nextStartDate >= objEndDate) {
            return true;
          }
        }
      
        // Check if the room is available after the last booking
        if (new Date(arr[arr.length - 1].endDate) <= objStartDate) {
          return true;
        }
      
        // If no available slot is found, return false
        return false;
      };

      getHotels=async ({location})=>{
        const hotels = await db.Hotel.findAll({
            include: [
              {
                model: db.Location,
                where: {
                  name: location,
                },
              },
              {
                model: db.Room,
              },
              {
                model: db.Amenity,
              },
            ],
          });
          return hotels;
      }

    }
      
module.exports= new hotelServices();
