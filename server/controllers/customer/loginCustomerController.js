const {
  isCustomerRegisteredWith,
  getCustomerByEmail,
  isCustomerLinkToUrl,
} = require("../../utils/customersUtils");
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

  if (!(await isCustomerLinkToUrl(loginLink, customer.id))) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  if (!(await isPasswordCorrect(password, customer.password))) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  const accessToken = generateToken(customer, "access");
  const refreshToken = generateToken(customer, "refresh");

  // TODO Store refresh token in database

  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  // TODO Add a role to the user (Admin, User, etc.)
  res.status(200).send({ message: "Utilisateur connecté", accessToken: accessToken });
};

module.exports = { handleLoginCustomer };
