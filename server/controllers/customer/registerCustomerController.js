const {
  isCustomerRegisteredWith,
  generateLinkToForm,
  createCustomer,
  createLinkToForm,
} = require("../../utils/customersUtils");
const { generatePassword } = require("../../utils/usersUtils");
const { sendLinkToNewCustomer } = require("../../utils/sendEmailUtils");

const handleRegisterCustomer = async (req, res) => {
  const { username, company } = req.body;
  let email = req.body.email;

  if (!username || !email || !company) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }
  email = email.toLowerCase();

  const isCustomerRegistered =
    (await isCustomerRegisteredWith(email, "email")) || (await isCustomerRegisteredWith(company, "company"));
  if (isCustomerRegistered) {
    res.status(409).send({ message: "Utilisateur déjà enregistré" });
    return;
  }

  const password = generatePassword();
  await createCustomer(username, company, email, password);

  const linkToForm = generateLinkToForm();
  await createLinkToForm(linkToForm, email);

  sendLinkToNewCustomer(email, username, password, linkToForm);

  res.status(200).send({ message: "Utilisateur enregistré" });
};

module.exports = { handleRegisterCustomer };
