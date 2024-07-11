const db= require("../models/index");
const Redis = require('ioredis');
const redis = new Redis();
const jwt= require("jsonwebtoken");
const userServices= require("../services/user");

const createUser = async (req, res) => {
  const { name, username, password, role } = req.body;

  try {
    const userData = { name, username, password, role };
    await redis.set(username, JSON.stringify(userData));

    const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const verificationLink = `http://localhost:5002/user/verify/${token}`;
    userServices.sendMail({username, verificationLink,topic:"Verification Mail"});
    res.status(201).send({ message: `Verification Mail sent. Waiting for confirmation` });
   
  } catch (error) {
    console.log("inside createUser error");
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => ({ [err.path]: err.message }));
      res.status(401).json({ error: errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};


const verify = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userDataString = await redis.get(decoded.username);
    
    if (!userDataString) {
      return res.status(401).send({ message: "Verification failed" });
    }
    
    const userData = JSON.parse(userDataString);
    const { name, username, password, role } = userData;
   
    const user = await db.User.create({ name, username, password, role });

    if (user.role === "hotel owner") {
      res.cookie("user_id", user.id, {
        // httpOnly: true,
        secure: false
      });
      res.redirect("http://localhost:3000/registerhotel");
    } else if (user.role === "traveller") {
      res.redirect("http://localhost:3000/login");
    } else {
      res.status(401).send({ message: "Verification failed" });
    }
  } catch (error) {
    res.status(401).send({ message:error });
  }
};



const Login=async (req, res)=>{
    const {username, password}= req.body;
    try{ 
    res.cookie("user_id", user.id, {
        // httpOnly:true,
        secure:false
    })

   return res.send({
        message:"Logged In Successfully",
        user:user
    })
}catch(err){
    res.status(401).send({message:err});
}
};

const forgotPassword=async (req, res)=>{
  const {username}= req.body;
  try{
  await redis.set("reset_password",username);
  const token= jwt.sign({username:username},process.env.JWT_SECRET,{expiresIn:'1hr'});
  const verificationLink = `http://localhost:5002/user/verifypassword/${token}`;
    userServices.sendMail({username, verificationLink,topic:"Password Reset Mail"});
    res.status(201).send({ message: `Password Reset Mail sent. Waiting for confirmation` });
  }catch(err){
    console.log(err);
    throw new Error({message:err});
  }

};

const verifyPassword= async (req, res)=>{
  res.redirect("http://localhost:3000/changepassword");
}

const changePassword= async (req, res)=>{
  const {username,newPassword}= req.body;
  const user= await db.User.findOne({
    where:{
      username: username
    }
  });
  if(!user){
   throw new Error({message:"No username found. Register User"});
  }
  await db.User.update({
    password:newPassword
  },{
    where: {
      username: username
    }
  });
  res.send({message:"Password Updated"});
};

module.exports={createUser, verify, Login, forgotPassword, changePassword, verifyPassword};