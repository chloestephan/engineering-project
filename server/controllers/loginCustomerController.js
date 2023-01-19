const {
  isCustomerRegisteredWith,
  getCustomerByEmail,
  isPasswordCorrect,
  generateToken,
} = require("../utils/customersUtils");

const handleLoginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send("Missing information");
    return;
  }

  if (!(await isCustomerRegisteredWith(email, "email"))) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const resultRequest = await getCustomerByEmail(email);
  const user = resultRequest.rows[0];
  if (!(await isPasswordCorrect(password, user.password))) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const accessToken = generateToken(user, "access");
  const refreshToken = generateToken(user, "refresh");

  // TODO Store refresh token in database

  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  // TODO Add a role to the user (Admin, User, etc.)
  res.status(200).send({ message: "User logged in", accessToken: accessToken });
};

module.exports = { handleLoginCustomer };
