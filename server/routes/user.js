const express= require("express");
const { createUser, verify, Login } = require("../controllers/user");

const router= express.Router();

router.post("/register", createUser);
router.get("/verify/:uniqueNum", verify);
router.post("/login", Login);

module.exports=router;