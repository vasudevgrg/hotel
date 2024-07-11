
const db= require("../models/index");
const Redis = require('ioredis');
const redis = new Redis();
const jwt= require("jsonwebtoken");
const { ERROR_MESSAGES, EMAIL_VALIDATION } = require("../libs/constants");
require("dotenv").config();

const authenticateChangePassword=async (req, res, next)=>{
    const token= req.params.token;
    console.log(process.env.JWT_SECRET);
    const savedUsername= await redis.get("reset_password");
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if(decoded.username=== savedUsername){
        next();
    }else{
        res.send({message:"Verification failed. Try Again"});
    }
};

const authenticateUsername= async (req, res, next)=>{
    const {username}= req.body;
    const user=await db.User.findOne({
        where:{
            username
        }
    });
    console.log(EMAIL_VALIDATION.test(username));
    if(EMAIL_VALIDATION.test(username)==false){
       return res.send({message:"InValid Username"})
    }
    if(!user){
       return res.status(404).send({message:ERROR_MESSAGES.USERNAME});
      }
  
      if(user.password!== password){
       return res.status(404).send({message:ERROR_MESSAGES.password});
      }
      next();
}

module.exports= {authenticateChangePassword, authenticateUsername};