const { getAdminByEmail, generatePassword } = require("../../utils/adminsUtils");
const { sendEmail } = require("../../utils/sendEmailUtils");
const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const client = db.getClient();

const handleForgotPasswordAdmin = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const resultRequest = await getAdminByEmail(email);
  if (resultRequest.rows.length === 0) {
    res.status(401).send("Informations incorrectes");
    return;
  }

  const newPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = {
    text: "UPDATE admins SET password = $1 WHERE email = $2",
    values: [hashedPassword, email],
  };
  await client.query(query);

  const body =
    `Bonjour Mme/M,\n\n` +
    `Suite à votre demande de mot de passe oublié, nous avons généré ce nouveau mot de passe pour votre compte : ${newPassword}\n\n` +
    "Sincèrement, toute l'équipe de l'engineering project.";

  sendEmail(email, "Nouveau mot de passe généré", body);

  res.status(200).send({ message: "Mot de passe mis à jour" });
};

module.exports = { handleForgotPasswordAdmin };
