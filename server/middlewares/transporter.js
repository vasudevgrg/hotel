var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vasudevgarg7@gmail.com',
    pass: 'mrxw qica hgux aqfs'
  }
});

module.exports= transporter;