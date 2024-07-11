const db= require("../models/index");
const transporter= require("../middlewares/transporter");

class userServices{
    sendMail=({username, verificationLink, topic})=>{
        transporter.sendMail(
            {
              from: "vasudevgarg7@gmail.com",
              to:username,
              subject: `This is a ${topic} for the Hotel Management Website.`,
              html: `<a href="${verificationLink}">Press Here</a> or visit ${verificationLink}`,
            },
            (error, info) => {
              if (error) {
                console.log(error);
                res.status(500).send({ message: "Failed to send verification email" });
              } else {
                console.log("Email sent: " + info.response);
                
              }
            }
          );
    }
};

module.exports=new userServices();