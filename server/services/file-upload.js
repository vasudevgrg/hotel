const cloudinary = require('cloudinary').v2;
require('dotenv').config();

class FileUploadServices{
    
  createImageUpload=async ()=>{
    console.log(process.env.API_SECRET);
    const timestamp = new Date().getTime()
    const signature = await cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.API_SECRET
    )
    return { timestamp, signature }
  };


};

module.exports= new FileUploadServices();