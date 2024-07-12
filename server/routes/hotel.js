const express= require("express");
const { createhotel, signedUrl, handleCitySuggestion, getHotels, allHotels, bookHotel, availableRooms, getHotel, addRating } = require("../controllers/hotel");
const { authenticateHotelAdmin } = require("../middlewares/authenticate");
const router= express.Router();

router.post("/createhotel",authenticateHotelAdmin, createhotel );
router.get("/signedurl", signedUrl);
router.get("/cities/suggestions", handleCitySuggestion);
router.post("/gethotels", getHotels);
router.get("/allhotels", allHotels);
router.post("/bookhotel", bookHotel);
router.post("/availablerooms", availableRooms);
router.get("/gethotel/:id", getHotel);
router.put("/addrating", addRating);

module.exports=router;