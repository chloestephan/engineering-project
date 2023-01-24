const nodemailer = require("nodemailer");

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true" ? true : false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

function sendEmail(receiver, subject, body) {
  const transporter = createTransporter();

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

function sendLinkToNewCustomer(receiver, username, password, linkToForm) {
  const title = "Formulaire d'inscription";
  const body =
    `Bonjour Mme/M ${username},\n\n` +
    `Bienvenue sur notre plateforme. Veuillez cliquer sur le lien suivant pour accéder à votre formulaire : ${linkToForm}\n\n` +
    `Votre mot de passe est: ${password}\n\n` +
    `Sincèrement, toute l'équipe de l'engineering project.`;
  sendEmail(receiver, title, body);
}

function sendNewPassword(receiver, newPassword) {
  const title = "Nouveau mot de passe généré";
  const body =
    `Bonjour Mme/M,\n\n` +
    `Suite à votre demande de mot de passe oublié, nous avons généré ce nouveau mot de passe pour votre compte : ${newPassword}\n\n` +
    `Sincèrement, toute l'équipe de l'engineering project.`;

  sendEmail(receiver, title, body);
}

module.exports = {
  sendEmail,
  sendNewPassword,
  sendLinkToNewCustomer,
};
