const express= require("express");
const { roomSchedule, updateSchedule, deleteSchedule } = require("../controllers/room");
const router= express.Router();

router.get("/roomschedule/:room_id",roomSchedule);
router.put("/updateschedule/:schedule_id", updateSchedule);
router.delete("/deleteschedule/:schedule_id", deleteSchedule);

module.exports= router;