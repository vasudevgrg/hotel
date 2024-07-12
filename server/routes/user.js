const express= require("express");
const { createUser, verify, Login, forgotPassword, changePassword, verifyPassword, getUserInfo } = require("../controllers/user");
const {authenticateChangePassword, authenticateUsername} = require("../middlewares/authenticate");

const router= express.Router();

router.post("/register", createUser);
router.get("/verify/:token", verify);
router.post("/login",authenticateUsername, Login);
router.post("/forgetpassword", forgotPassword);
router.get("/verifypassword/:token", authenticateChangePassword, verifyPassword);
router.post("/changepassword", changePassword);
router.get("/getuserinfo/:user_id",getUserInfo);

module.exports=router;