const { isCustomerRegisteredWith, getCustomerByEmail } = require("../../utils/customersUtils");
const { isPasswordCorrect, generateToken } = require("../../utils/usersUtils");

const handleLoginCustomer = async (req, res) => {
  const { email, password } = req.body;

  const invalidInformation = !email || !password || !(await isCustomerRegisteredWith(email, "email"));

  if (invalidInformation) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const customer = await getCustomerByEmail(email);
  if (!(await isPasswordCorrect(password, customer.password))) {
    res.status(401).send("Informations incorrectes");
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
