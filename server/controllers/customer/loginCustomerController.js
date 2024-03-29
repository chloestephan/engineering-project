const { getCustomerByEmail, isCustomerLinkToUrl } = require("../../utils/customersUtils");
const { isPasswordCorrect, generateToken } = require("../../utils/usersUtils");

const handleLoginCustomer = async (req, res) => {
  const { password, loginLink } = req.body;
  let email = req.body.email;

  if (!email || !password) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }
  email = email.toLowerCase();

  const customer = await getCustomerByEmail(email);
  if (!customer) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  if (!(await isPasswordCorrect(password, customer.password))) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  if (!(await isCustomerLinkToUrl(customer.id, loginLink))) {
    res.status(401).send({ message: "Lien de formulaire incorrect" });
    return;
  }

  const accessToken = generateToken(customer, "access");
  const refreshToken = generateToken(customer, "refresh");

  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  res.status(200).send({ message: "Utilisateur connecté", accessToken: accessToken });
};

module.exports = { handleLoginCustomer };
