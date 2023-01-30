const { getCustomerByEmail, isCustomerLinkToUrl } = require("../../utils/customersUtils");

const handleCheckCustomerLink = async (req, res) => {
  const { email, linkToForm } = req.body;
  
  const customer = await getCustomerByEmail(email);
  if (!customer) {
    return res.status(400).send({ message: "Utilisateur introuvable" });
  }

  if (!(await isCustomerLinkToUrl(linkToForm, customer.id))) {
    return res.status(400).send({ message: "Lien invalide" });
  }

  res.status(200).send({ message: "Connexion autorisée" });
};

module.exports = { handleCheckCustomerLink };
