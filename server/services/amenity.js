const db= require("../models/index");

class amenityServices{
    createOrFindAmenity=async (e, transaction)=>{
        const amenity= await db.Amenity.findOrCreate({
            where: {
                name: e.trim()
            },
            defaults:{
                name:e.trim()
            },
            transaction
        });
        return amenity;
    }
};

module.exports=new  amenityServices();