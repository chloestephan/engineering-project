const { generateLinkToForm, updateLinkToForm, getCustomerByEmail, updateCustomerPassword } = require("../../utils/customersUtils");
const { sendLinkToNewCustomer } = require("../../utils/sendEmailUtils");
const { generatePassword } = require("../../utils/usersUtils");

const handleSendLink = async (req, res) => {
  let email = req.body.email;

  if (!email) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }
  email = email.toLowerCase();

  const customer = await getCustomerByEmail(email);
  if (!customer) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  const linkToForm = generateLinkToForm();
  await updateLinkToForm(linkToForm, email);

  const newPassword = generatePassword();
  await updateCustomerPassword(email, newPassword);
  
  sendLinkToNewCustomer(email, customer.username, newPassword, linkToForm);

  res.status(200).send({ message: "Nouveau lien envoyé" });
};

module.exports = { handleSendLink };
