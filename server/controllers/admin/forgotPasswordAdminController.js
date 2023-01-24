const { getAdminByEmail, updateAdminpassword } = require("../../utils/adminsUtils");
const { generatePassword } = require("../../utils/usersUtils");
const { sendNewPassword } = require("../../utils/sendEmailUtils");

const handleForgotPasswordAdmin = async (req, res) => {
  let email = req.body.email;

  if (!email) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }
  email = email.toLowerCase();

  const admin = await getAdminByEmail(email);
  if (!admin) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  const newPassword = generatePassword();
  await updateAdminpassword(email, newPassword);

  sendNewPassword(email, newPassword);

  res.status(200).send({ message: "Mot de passe mis à jour" });
};

module.exports = { handleForgotPasswordAdmin };
