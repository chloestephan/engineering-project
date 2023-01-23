const nodemailer = require("nodemailer");

function sendEmail(receiver, subject, body) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true" ? true : false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: receiver,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  sendEmail,
};
