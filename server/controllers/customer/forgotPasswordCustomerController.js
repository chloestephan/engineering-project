const { isCustomerRegisteredWith, updateCustomerPassword } = require("../../utils/customersUtils");
const { sendNewPassword } = require("../../utils/sendEmailUtils");
const { generatePassword } = require("../../utils/usersUtils");

const handleForgotPasswordCustomer = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }

  if (!(await isCustomerRegisteredWith(email, "email"))) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  const newPassword = generatePassword();
  await updateCustomerPassword(email, newPassword);

  sendNewPassword(email, newPassword);

  res.status(200).send({ message: "Mot de passe mis à jour" });
};

module.exports = { handleForgotPasswordCustomer };
