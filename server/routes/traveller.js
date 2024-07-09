const express= require("express");
const { createTrip, allTrips } = require("../controllers/traveller");
const router= express.Router();

router.post("/addtrip", createTrip);
router.get("/alltrips",allTrips);

module.exports= router;