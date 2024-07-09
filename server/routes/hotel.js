const express= require("express");
const { createhotel, signedUrl, handleCitySuggestion, getHotels, allHotels, bookHotel, availableRooms, getHotel, addRating } = require("../controllers/hotel");
const router= express.Router();

router.post("/createhotel",createhotel );
router.get("/signedurl", signedUrl);
router.post("/cities/suggestions", handleCitySuggestion);
router.post("/gethotels", getHotels);
router.get("/allhotels", allHotels);
router.post("/bookhotel", bookHotel);
router.post("/availablerooms", availableRooms);
router.get("/gethotel/:id", getHotel);
router.put("/addrating", addRating);

module.exports=router;