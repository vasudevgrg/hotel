const db= require("../models/index");
const transporter= require("../middlewares/transporter");
const { where } = require("sequelize");

const createUser= async (req, res)=>{
    console.log(req.body);
    const {name, username, password, role}= req.body;
    const uniqueNum=Math.trunc( Math.random()*1000);
try{
    const user= await db.User.create({name, username, password, role, uniqueNum:uniqueNum});
console.log(user);
    const verificationLink = `http://localhost:5002/user/verify/${uniqueNum}`;
  
    transporter.sendMail(
      {
        from: "vasudevgarg7@gmail.com",
        to: req.body.username,
        subject: "This is verification mail for Hotel Management Website.",
        html: `<a href="${verificationLink}">Press Here</a> or visit ${verificationLink}`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
  
          res
            .status(201)
            .json({
              message: "Mail sent. Waiting for conformation"
            });
        }
      }
    );
    // res.cookie("user_id", user.id, {
    //     httpOnly:true, secure:false
    // })
    // res.send({message:"user created", user: user});
}catch (error) {
    if (error.name === 'SequelizeValidationError' || "SequelizeUniqueConstraintError") {
      const errors = error.errors.map(err => ({ [err.path]: err.message }));
      res.status(401).json({error: errors });
    } else {
      res.status(500).json({ message: error });
    }
  }
};

const verify= async (req, res)=>{
    const num = req.params.uniqueNum;
  console.log("inside verify");
    const user = await db.User.findOne({where:{ uniqueNum: num }});
  
    if (user.role=="hotel owner") {
        res.cookie("user_id", user.id, {
            httpOnly:true,
            secure:false
        })
      res.redirect("http://localhost:3000/registerhotel");
      
    }else if(user.role=="traveller"){
        // res.cookie("user_id", user.id, {
        //     httpOnly:true,
        //     secure:false
        // })
      res.redirect("http://localhost:3000/login");
    } else {
      res.status(401).send({ message: "verification failed" });
    }
};

const Login=async (req, res)=>{
    const {username, password}= req.body;
    try{

    
    const user=await db.User.findOne({
        where:{
            username, password
        }
    });
    res.cookie("user_id", user.id, {
        httpOnly:true,
        secure:false
    })

    res.send({
        message:"Logged In Successfully",
        user:user
    })
}catch(err){
    res.status(401).send({message:err});
}
}

module.exports={createUser, verify, Login};