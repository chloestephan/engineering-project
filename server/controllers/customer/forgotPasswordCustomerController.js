const { isCustomerRegisteredWith } = require("../../utils/customersUtils");
const { generatePassword } = require("../../utils/usersUtils");
const { sendEmail } = require("../../utils/sendEmailUtils");
const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const client = db.getClient();

const handleForgotPasswordCustomer = async (req, res) => {
  const { email } = req.body;

  const invalidInformation = !email || !(await isCustomerRegisteredWith(email, "email"));

  if (invalidInformation) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const newPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = {
    text: "UPDATE customers SET password = $1 WHERE email = $2",
    values: [hashedPassword, email],
  };
  await client.query(query);

  const title = "Nouveau mot de passe généré";
  const body =
    `Bonjour Mme/M,\n\n` +
    `Suite à votre demande de mot de passe oublié, nous avons généré ce nouveau mot de passe pour votre compte : ${newPassword}\n\n` +
    `Sincèrement, toute l'équipe de l'engineering project.`;

  sendEmail(email, title, body);

  res.status(200).send({ message: "Mot de passe mis à jour" });
};

module.exports = { handleForgotPasswordCustomer };
