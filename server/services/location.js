const db = require("../models/index");

class LocationServices {
  findOrCreateLocation = async (location, transaction) => {
    console.log(location);
    const loc = await db.Location.findOrCreate({
      where: {
        name: location.trim()
      },
      defaults: {
        name: location.trim()
      },
      transaction
    });
    return loc;
  };
}

module.exports = new LocationServices();
