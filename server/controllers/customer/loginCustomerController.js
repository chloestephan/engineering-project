const { isCustomerRegisteredWith, getCustomerByEmail } = require("../../utils/customersUtils");
const { isPasswordCorrect, generateToken } = require("../../utils/usersUtils");

const handleLoginCustomer = async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();

  if (!email || !password) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }

  if (!(await isCustomerRegisteredWith(email, "email"))) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  const customer = await getCustomerByEmail(email);
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
